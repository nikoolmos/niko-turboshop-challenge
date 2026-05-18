import { PartProviders } from "src/constants/part-providers-enum";
import { ItemDetail } from "../interfaces/item-detail";
import { GetDetailsService } from "../interfaces/get-details-service/get-details-service.interface";
import { PartDetailNormalizer } from "../interfaces/part-detail-normalizer/part-detail-normalizer.interface";

export class GetPartDetailInfoUseCase {
    private autoPartsPlusService: GetDetailsService;
    private globalPartsService: GetDetailsService;
    private repuestosMaxService: GetDetailsService;

    private autoPartsPlusNormalizer: PartDetailNormalizer;
    private globalPartsNormalizer: PartDetailNormalizer;
    private repuestosMaxNormalizer: PartDetailNormalizer;

    constructor(
        autoPartsPlusService: GetDetailsService,
        globalPartsService: GetDetailsService,
        repuestosMaxService: GetDetailsService,
        autoPartsPlusNormalizer: PartDetailNormalizer,
        globalPartsNormalizer: PartDetailNormalizer,
        repuestosMaxNormalizer: PartDetailNormalizer,
    ) {
        this.autoPartsPlusService = autoPartsPlusService;
        this.globalPartsService = globalPartsService;
        this.repuestosMaxService = repuestosMaxService;

        this.autoPartsPlusNormalizer = autoPartsPlusNormalizer;
        this.globalPartsNormalizer = globalPartsNormalizer;
        this.repuestosMaxNormalizer = repuestosMaxNormalizer;
    }

    execute(id: string, provider: PartProviders): ItemDetail {

        switch (provider) {
            case PartProviders.AUTO_PARTS_PLUS:
                return this.getPartDetailsFromAutoPartsPlus(id);
            case PartProviders.REPUESTOS_MAX:
                return this.getPartDetailsFromRepuestosMax(id);
            case PartProviders.GLOBAL_PARTS:
                return this.getPartDetailsFromGlobalParts(id);
        }

    }

    private getPartDetailsFromAutoPartsPlus(id: string): ItemDetail {
        const response = this.autoPartsPlusService.getPartDetail(id);
        const result = this.autoPartsPlusNormalizer.normalize(response);
        return result;
    }

    private getPartDetailsFromRepuestosMax(id: string): ItemDetail {
        const response = this.repuestosMaxService.getPartDetail(id);
        const result = this.repuestosMaxNormalizer.normalize(response);
        return result;
    }

    private getPartDetailsFromGlobalParts(id: string): ItemDetail {
        const response = this.globalPartsService.getPartDetail(id);
        const result = this.globalPartsNormalizer.normalize(response);
        return result;
    }


}
