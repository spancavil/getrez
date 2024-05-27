import { AuthGuard } from "@nestjs/passport";

//Implements jwt strategy
export class JwtAuthGuard extends AuthGuard('jwt') {}