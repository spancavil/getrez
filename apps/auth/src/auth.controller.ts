import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  //Get the local user authenticated after run the verifyUser.
  //For that we will use a custom decorator.
  async login (
      @CurrentUser() user: UserDocument,
      @Res({passthrough: true}) response: Response
  ) {
      await this.authService.login(user, response)
      response.send(user)
  }

  @UseGuards(JwtAuthGuard)
  //Allows to accept RPC calls on our chosen transport layer
  @MessagePattern('authenticate')
  async authenticate(@Payload() data:any
  ) {
    console.log({data});
    return data.user
  }
}
