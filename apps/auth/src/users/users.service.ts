import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {

    constructor (private readonly usersRepository: UserRepository){}

    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto)
        return this.usersRepository.create({
             ...createUserDto,
             password: await bcrypt.hash(createUserDto.password, 10)
        })
    }

    //At the end "return user" will put the property user in the request object
    async verifyUser (email: string, password: string) {
        const user = await this.usersRepository.findOne({email})
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) throw new UnauthorizedException('Credentials are not valid.')
        return user
    }

    async getUser (getUserDto: GetUserDto ) {
        return await this.usersRepository.findOne({_id: getUserDto.userId})
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.findOne({email: createUserDto.email})
        } catch (error) {
            return
        }
        throw new UnprocessableEntityException('Email already exists')
    }
}
