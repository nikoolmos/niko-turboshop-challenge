import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';

import { CatalogEntrypoint } from 'src/catalog-entrypoint/catalog-entrypoint';

@Controller('catalog')
export class CatalogController {

    @Get('/')
    public async getCatalog(@Query('page') page: string, @Query('limit') limit: string, @Res() response: Response) {
        const res = await CatalogEntrypoint.getPartsCatalog(page, limit);
        console.log('LA RESPUESTA ES', res);
        response.status(200).json(res).send();
    }
}
