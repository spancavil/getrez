import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRootAsync({
        //Use factory to load dependencies from factory pattern.
        //The dependency we will use is an instance of ConfigService that will obtain the specified env variable
        useFactory: (configService: ConfigService) => {
            console.log(configService.get('MONGODB_URI'));
            return {
                uri: configService.get('MONGODB_URI')
            }
        },
        inject: [ConfigService]
    })]
})
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]){
        return MongooseModule.forFeature(models)
    }
}
