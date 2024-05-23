import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserDocument, UserSchema } from './models/users.schema';
import { UserRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    LoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  //Exports will allow to user this service in another services, like local strategy
  exports: [UsersService],
})
export class UsersModule {}
