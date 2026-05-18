import { Test, TestingModule } from '@nestjs/testing';
import { ItemDetailController } from './item-detail.controller';

describe('ItemDetailController', () => {
  let controller: ItemDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemDetailController],
    }).compile();

    controller = module.get<ItemDetailController>(ItemDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
