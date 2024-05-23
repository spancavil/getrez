import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {

    constructor (private readonly usersRepository: UserRepository){}

    async create(createUserDto: CreateUserDto) {
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
}
