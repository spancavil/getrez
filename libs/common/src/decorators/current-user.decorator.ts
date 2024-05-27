import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDocument } from "apps/auth/src/users/models/users.schema";

//We will pull out the user from the request and make it accessible from the controller
const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
    return context.switchToHttp().getRequest().user
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
)