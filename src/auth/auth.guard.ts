import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { UserService } from 'src/user';
import { ConfigService } from '@nestjs/config';

export type UserPayload = {
  _id: number;
  email: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    protected readonly jwtService: JwtService,
    protected readonly reflector: Reflector,
    protected readonly userService: UserService,
    protected readonly configService: ConfigService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService
        .verifyAsync<UserPayload>(token, {
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
        })
        .catch(() => {
          throw new UnauthorizedException('Token expirado');
        });

      if (!payload._id) {
        throw new UnauthorizedException('Token inválido');
      }

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const user = await this.userService
        .findOneWithRoles(payload._id)
        .catch((error) => {
          throw new InternalServerErrorException(error);
        });

      if (!user) {
        throw new InternalServerErrorException('User not authorized');
      }

      request['user'] = user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
