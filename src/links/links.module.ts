import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

const DEFAULT_TTL = 5 * 60 * 1000;

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: DEFAULT_TTL,
      }),
    }),
  ],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
