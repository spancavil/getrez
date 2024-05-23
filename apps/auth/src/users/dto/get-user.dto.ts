import { IsString, IsMongoId } from "class-validator"

export class GetUserDto {
    @IsString()
    userId: string
}