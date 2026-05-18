import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { GetQuantityEntryPoint } from './get-quantity-entry-point/get-quantity-entry-point';
import { PartProviders } from 'src/constants/part-providers-enum';

@Controller('quantity')
export class QuantityController {

    @Get('/')
    public async getQuantity(@Query('sku') sku: string, @Query('provider') provider: string, @Res() res: Response) {
        try {
            const result = await GetQuantityEntryPoint.execute(sku, PartProviders[provider]);
            res.json(result).send();
        } catch(error) {
            console.error(error);
            res.status(500).send();
        }
    }
}
