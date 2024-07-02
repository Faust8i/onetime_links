import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LinkDto {
  @ApiProperty({
    type: 'string',
    description: 'Входящая строка',
    example: '<адрес_сервиса>/t1vbc',
  })
  @IsString()
  @IsNotEmpty()
  link: string;
}
