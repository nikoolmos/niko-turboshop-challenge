import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';

import { CatalogEntrypoint } from 'src/catalog/catalog-entrypoint/catalog-entrypoint';

@Controller('catalog')
export class CatalogController {

    @Get('/')
    public async getCatalog(@Query('page') page: string, @Query('limit') limit: string, @Res() response: Response) {
        const sanitizedPage = !page ? '0' : page;
        const sanitizedLimit = !limit ? '20': limit;

        const res = await CatalogEntrypoint.getPartsCatalog(sanitizedPage, sanitizedLimit);
        console.log('LA RESPUESTA ES', res);
        response.status(200).json(res).send();
    }
}
