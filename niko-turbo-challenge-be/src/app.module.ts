import { Module } from '@nestjs/common';
import { CatalogController } from './catalog/catalog.controller';
import { ItemDetailController } from './item-detail/item-detail.controller';
import { PriceController } from './price/price.controller';

@Module({
  imports: [],
  controllers: [CatalogController, ItemDetailController, PriceController],
  providers: [],
})
export class AppModule {}
