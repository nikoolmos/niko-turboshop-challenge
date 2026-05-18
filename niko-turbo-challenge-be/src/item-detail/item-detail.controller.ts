import { Controller, Get, Query, Res } from '@nestjs/common';
import { GetPartDetailsEntrypoint } from './get-part-details-entrypoint/get-part-details-entrypoint';
import { PartProviders } from 'src/constants/part-providers-enum';
import type { Response } from 'express';
import { NotFoundError } from './errors/not-found-error/not-found-error';

@Controller('item-detail')
export class ItemDetailController {

    @Get('/')
    public async getPartDetail(@Query('id') id: string, @Query('provider') provider: string, @Res() res: Response) {
        try {
            const result = await GetPartDetailsEntrypoint.execute(id, PartProviders[provider]);
            res.json(result).send();

        } catch (error: unknown) {
            console.log(error)
            if (error instanceof NotFoundError) {
                res.json({}).status(404).send();
            } else {
                res.status(500).send();
            }
        }
    }
}
