import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      //      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          // Extract the JWT token from the 'jwt' cookie
          const token = request.headers?.cookie;
          if (token) return token.slice(6);
          return token;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
      ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.name,
      role: payload.role,
    };
  }
}
