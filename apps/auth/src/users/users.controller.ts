import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './models/users.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    //Will get the user using passport strategy (JwtAuthGuard)
    //and getting the user from the request with the @CurrentUser decorator
    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(
        @CurrentUser() user: UserDocument
    ) {
        return user
    }
}
