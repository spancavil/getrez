import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    //This module will load process env variables and will make a validation
    imports: [NestConfigModule.forRoot(
        {validationSchema: Joi.object({
            MONGODB_URI: Joi.string().required(),
        })}
    )], 
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
