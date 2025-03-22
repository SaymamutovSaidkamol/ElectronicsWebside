import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateLikeDto {
    @IsNumber()
    userId: number

    @ApiProperty({example: 1})
    @IsNumber()
    productId: number
}
