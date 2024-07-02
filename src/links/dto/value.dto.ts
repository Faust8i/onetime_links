import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValueDto {
  @ApiProperty({
    type: 'string',
    description: 'Входящиее значение для генерируемой одноразовой ссылки',
    example: 'Test123',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    type: 'number',
    description: 'Время действия генерируеой ссылки, в мс',
    example: 300000,
    required: false,
  })
  @IsNumber()
  ttl?: number;
}
