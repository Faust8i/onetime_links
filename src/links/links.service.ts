import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { LinkDto } from './dto/link.dto';
import { ValueDto } from './dto/value.dto';
import { ICachedValue } from './interface/cached-value.interface';

const SERVICE_PATH = 'http://localhost:3000/onetimelinks/';

@Injectable()
export class LinksService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Создать одноразовую ссылку
   * @param value Входящиее значение для генерируемой одноразовой ссылки
   * @param ttl Время действия генерируеой ссылки, в мс
   * @returns Одноразовая ссылка
   */
  async createLink(value: string, ttl?: number): Promise<LinkDto> {
    try {
      const link: string = await this.generateUniqueLink();

      await this.cacheManager.set(link, { value, active: true }, ttl);

      return { link: SERVICE_PATH + link };
    } catch (e: any) {
      throw new HttpException(
        'Произошла ошибка при создании ссылки: ' + e.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Получить значение по одноразовой ссылке
   * @param link Ключ из одноразовой ссылки
   * @returns Значение
   */
  async getValue(link: string): Promise<ValueDto> {
    try {
      const storedLink: ICachedValue = await this.cacheManager.get(link);

      if (!storedLink || !storedLink.active) {
        throw new NotFoundException('Ссылка не найдена или деактивирована.');
      }

      storedLink.active = false;
      await this.cacheManager.set(link, storedLink);

      return { value: storedLink.value };
    } catch (e: any) {
      throw new HttpException(
        'Произошла ошибка при обработке ссылки: ' + e.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Сгенерировать ключ для одноразовой ссылки
   * @returns Ключ для одноразовой ссылки
   */
  private async generateUniqueLink(): Promise<string> {
    let link: string = '';
    do {
      link = Math.random().toString(36).substring(7);
    } while (await this.cacheManager.get(link));
    return link;
  }
}
