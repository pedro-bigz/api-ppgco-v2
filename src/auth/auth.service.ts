import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { ENV } from '@app/core';
import { UserService } from 'src/user';

type TokenType = {
  _id: number;
  email: string;
  name: string;
};

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new ForbiddenException();
    }

    const {
      password: storedPassword,
      id: userId,
      ...userData
    } = user.dataValues;

    if (!bcrypt.compareSync(password, storedPassword)) {
      throw new UnauthorizedException();
    }

    if (userData.forbidden) {
      throw new ForbiddenException('Forbidden access');
    }

    if (!userData.activated) {
      throw new UnauthorizedException('Activate your account before sign in');
    }

    const payload = {
      _id: userId,
      email,
      name: user.full_name,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '4h',
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
    });

    return {
      auth: { accessToken, refreshToken },
      user: this.usersService.omitSensitiveData(user),
    };
  }

  private extractTokenFromAuthorization(authorization: string): string {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : '';
  }

  public async verify(authorization: string | undefined | null) {
    try {
      if (!authorization) {
        throw new Error();
      }

      const hasAccess = this.jwtService.verify(
        this.extractTokenFromAuthorization(authorization),
      );

      return { hasAccess };
    } catch (error) {
      return { hasAccess: false };
    }
  }

  public async refresh(requestBody: any) {
    const token = requestBody.refreshToken;

    const { _id, email, name } = await this.jwtService.verifyAsync<TokenType>(
      token,
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
      },
    );

    const user = await this.usersService.findOne(_id);

    if (!user) {
      throw new ForbiddenException();
    }

    const payload = {
      _id,
      name,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '4h',
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '4h',
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });

    return {
      auth: { accessToken, refreshToken },
      user: this.usersService.omitSensitiveData(user),
    };
  }
}
