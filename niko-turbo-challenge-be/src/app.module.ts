import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogController } from './catalog/catalog.controller';

@Module({
  imports: [],
  controllers: [AppController, CatalogController],
  providers: [AppService],
})
export class AppModule {}
