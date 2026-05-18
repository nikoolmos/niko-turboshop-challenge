import { Module } from '@nestjs/common';
import { CatalogController } from './catalog/catalog.controller';
import { ItemDetailController } from './item-detail/item-detail.controller';
import { PriceController } from './price/price.controller';
import { QuantityController } from './quantity/quantity.controller';

@Module({
  imports: [],
  controllers: [CatalogController, ItemDetailController, PriceController, QuantityController],
  providers: [],
})
export class AppModule {}
