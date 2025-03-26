import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import _map from 'lodash/map';
import _pick from 'lodash/pick';

import { Permission, PermissionsService } from 'src/permissions';
import { User, UserService } from 'src/user';
import { UsersPasswordResetService } from 'src/users-password-reset';

type TokenType = {
  _id: number;
  email: string;
  name: string;
};

export type DecodedToken = {
  _id: number;
  email: string;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly permissionService: PermissionsService,
  ) { }

  public async signIn(email: string, password: string): Promise<any> {
    const user = (await this.usersService.findByEmail(email)) as User & {
      getPermissions: () => Promise<Permission[]>;
    };

    if (!user) {
      throw new ForbiddenException();
    }

    const {
      password: storedPassword,
      id: userId,
      roles,
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
      expiresIn: '24h',
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
    });

    this.usersService.setLastLogin(user);

    const permissions = await this.permissionService
      .getUserPermissions(user)
      .then((permissions: Permission[]) => {
        return permissions.map(({ name }) => name);
      });

    return {
      auth: { accessToken, refreshToken },
      user: {
        ...this.usersService.omitSensitiveData(user),
        roles: _map(roles, 'name'),
        permissions,
      },
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

    const secretKeys = {
      access: this.configService.get<string>('JWT_SECRET_KEY'),
      refresh: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
    };

    const payload = await this.jwtService.verifyAsync<TokenType>(token, {
      secret: secretKeys.refresh,
    });

    const newPayload = _pick(payload, ['_id', 'email', 'name']);

    if (!(await this.usersService.exists(payload._id))) {
      throw new ForbiddenException();
    }

    const accessToken = await this.jwtService.signAsync(newPayload, {
      expiresIn: '4h',
      secret: secretKeys.access,
    });

    const refreshToken = await this.jwtService.signAsync(newPayload, {
      expiresIn: '4h',
      secret: secretKeys.access,
    });

    return { auth: { accessToken, refreshToken } };
  }
}
