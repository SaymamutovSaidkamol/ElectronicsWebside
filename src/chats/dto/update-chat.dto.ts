import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateChatDto {
    @ApiProperty({example: 1})
    @IsNumber()
    to_userId?: number

    @ApiProperty({example: "Salom Qalaysiz"})
    @IsString()
    message?: string
}