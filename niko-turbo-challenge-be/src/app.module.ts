import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogController } from './catalog/catalog.controller';
import { ItemDetailController } from './item-detail/item-detail.controller';

@Module({
  imports: [],
  controllers: [AppController, CatalogController, ItemDetailController],
  providers: [AppService],
})
export class AppModule {}
