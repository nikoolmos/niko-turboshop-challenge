import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { GetPriceEntryPoint } from './get-price-entry-point/get-price-entry-point';
import { PartProviders } from 'src/constants/part-providers-enum';

@Controller('price')
export class PriceController {

    @Get('/')
    public async getPrice(@Query('sku') sku: string, @Query('provider') provider: string, @Res() res: Response) {
        try {
            const result = await GetPriceEntryPoint.execute(sku, PartProviders[provider]);
            res.json(result).send();
        } catch(error) {
            console.error(error);
            res.status(500).send();
        }
    }
}
