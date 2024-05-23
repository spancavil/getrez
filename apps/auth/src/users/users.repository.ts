import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { UserDocument } from "./models/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

//With this decorator we can make it injectable, then import in the providers of the app,
//so it can be used in the constructor of, for example, a service
@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {

    //Logger defined in abstract class.
    protected readonly logger = new Logger(UserRepository.name)

    constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
        super(userModel)
    }
}