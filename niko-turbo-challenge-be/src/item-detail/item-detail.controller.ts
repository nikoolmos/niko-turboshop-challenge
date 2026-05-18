import { Controller, Get, Query, Res } from '@nestjs/common';
import { GetPartDetailsEntrypoint } from './get-part-details-entrypoint/get-part-details-entrypoint';
import { PartProviders } from 'src/constants/part-providers-enum';
import type { Response } from 'express';

@Controller('item-detail')
export class ItemDetailController {

    @Get('/')
    getPartDetail(@Query('id') id: string, @Query('provider') provider: string, @Res() res: Response) {
        const result = GetPartDetailsEntrypoint.execute(id, PartProviders[provider]);

        res.json(result).send();
    }
}
