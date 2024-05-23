import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './users/current-user.decorator';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';

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
}
