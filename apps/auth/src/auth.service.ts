import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  //user correspond to validated user
  async login(user: UserDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION_SECONDS'),
    );

    const token = this.jwtService.sign(tokenPayload)

    //Set in the response a cookie with a valid token for authentication
    response.cookie('Authentication', token, 
      {
        httpOnly: true,
        expires: expires,
      }
    )
  }
}
