import { Payload } from '@/common/interface/auth.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: Payload) {
    const jwtToken = await this.jwtService.signAsync(payload);
    return {
      access_token: jwtToken,
    };
  }
}
