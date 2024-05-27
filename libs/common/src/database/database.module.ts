import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
    //forRootAsync is used to configure the Mongoose connection asynchronously, allowing for flexibility in loading configuration values. (dynamic module)
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

// Purpose: It allows other modules (like your reservations module) to register their specific Mongoose models with the application. This promotes modularity and keeps the DatabaseModule focused solely on establishing the connection.
export class DatabaseModule {
    static forFeature(models: ModelDefinition[]){
        return MongooseModule.forFeature(models)
    }
}
