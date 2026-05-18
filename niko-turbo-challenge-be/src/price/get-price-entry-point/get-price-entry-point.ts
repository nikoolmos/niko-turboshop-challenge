import { PartProviders } from "src/constants/part-providers-enum";
import { GetPartDetailInfoUseCase } from "src/item-detail/get-part-detail-info-use-case/get-part-detail-info-use-case";
import { AutoPartsPlusPartDetailNormalizer } from "src/item-detail/normalizers/auto-parts-plus-part-detail-normalizer/auto-parts-plus-part-detail-normalizer";
import { GlobalPartsPartDetailNormalizer } from "src/item-detail/normalizers/global-parts-part-detail-normalizer/global-parts-part-detail-normalizer";
import { RepuestosMaxPartDetailNormalizer } from "src/item-detail/normalizers/repuestos-max-part-detail-normalizer/repuestos-max-part-detail-normalizer";
import { AutoPartsPlusService } from "src/item-detail/services/auto-parts-plus-service/auto-parts-plus-service";
import { GlobalPartsPlusService } from "src/item-detail/services/global-parts-plus-service/global-parts-plus-service";
import { RepuestosMaxService } from "src/item-detail/services/repuestos-max-service/repuestos-max-service";

export class GetPriceEntryPoint {

    public static execute(id: string, provider: PartProviders) {
        const autoPartsPlusService = new AutoPartsPlusService();
        const globalPartsService = new GlobalPartsPlusService();
        const repuestosMaxService = new RepuestosMaxService();

        const autoPartsPlusNormalizer = new AutoPartsPlusPartDetailNormalizer();
        const globalPartsNormalizer = new GlobalPartsPartDetailNormalizer();
        const repuestosMaxNormalizer = new RepuestosMaxPartDetailNormalizer();

        const getPartDetailsUseCase = new GetPartDetailInfoUseCase(
            autoPartsPlusService,
            globalPartsService,
            repuestosMaxService,
            autoPartsPlusNormalizer,
            globalPartsNormalizer,
            repuestosMaxNormalizer,
        );

        const res = getPartDetailsUseCase.execute(id, provider)

        return res.then(res => {
            return { price: res.unitPrice, currencyCode: res.currencyCode };
        });
    }
}
