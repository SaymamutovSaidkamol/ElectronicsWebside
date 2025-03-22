import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateViewDto {
    @IsNumber()
    userId: number

    @ApiProperty({example: 1})
    @IsNumber()
    productId: number

    @IsOptional()
    view_at?: Date = new Date()
}
