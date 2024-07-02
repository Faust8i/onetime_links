import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { LinksService } from './links.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValueDto } from './dto/value.dto';
import { LinkDto } from './dto/link.dto';

@Controller('onetimelinks')
@ApiTags('Одноразовые ссылки')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('create')
  @ApiOperation({ summary: 'Создание одноразовой ссылки' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Одноразовая ссылка',
    type: LinkDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Внутренняя ошибка сервера',
  })
  @ApiBody({
    type: ValueDto,
    required: true,
    description: 'Входящиее значение для генерируемой одноразовой ссылки',
  })
  async createLink(@Body() params: ValueDto): Promise<LinkDto> {
    return await this.linksService.createLink(params.value, params.ttl);
  }

  @Get(':link')
  @ApiOperation({ summary: 'Получение значения по одноразовой ссылке' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Значение',
    type: ValueDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Внутренняя ошибка сервера',
  })
  @ApiParam({
    name: 'link',
    type: 'string',
    required: true,
    description: 'Одноразовая ссылка',
    example: '<адрес_сервиса>/t1vbc',
  })
  async getValue(@Param('link') link: string): Promise<ValueDto> {
    return await this.linksService.getValue(link);
  }
}
