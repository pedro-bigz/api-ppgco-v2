import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { ENV } from 'core';
import { UserService } from 'src/user';

type TokenType = {
  _id: number;
  email: string;
  nome: string;
};

const env = ENV();

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const {
      password: storedPassword,
      id: userId,
      ...usedData
    } = user.dataValues;

    if (!bcrypt.compareSync(password, storedPassword)) {
      throw new UnauthorizedException();
    }

    const payload = {
      _id: userId,
      email,
      nome: usedData.nome,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '4h',
      secret: env.JWT_SECRET_KEY,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: env.JWT_REFRESH_SECRET_KEY,
    });

    return {
      auth: { accessToken, refreshToken },
      user: {
        id: userId,
        nome: usedData.nome,
        email: usedData.email,
        avatar: usedData.avatar,
        master: usedData.master,
        codiemp: usedData.codiemp,
      },
    };
  }

  private extractTokenFromAuthorization(authorization: string): string {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : '';
  }

  public async verify(authorization: string) {
    try {
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

    const { _id, email } = (await this.jwtService.verifyAsync(token, {
      secret: env.JWT_SECRET_KEY,
    })) as TokenType;

    const payload = {
      _id,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '4h',
      secret: env.JWT_SECRET_KEY,
    });
    return { auth: { accessToken } };
  }
}
