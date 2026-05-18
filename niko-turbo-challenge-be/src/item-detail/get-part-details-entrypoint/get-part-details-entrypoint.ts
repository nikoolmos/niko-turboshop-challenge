import { AutoPartsPlusService } from "../services/auto-parts-plus-service/auto-parts-plus-service";
import { GlobalPartsPlusService } from "../services/global-parts-plus-service/global-parts-plus-service";
import { RepuestosMaxService } from "../services/repuestos-max-service/repuestos-max-service";
import { GlobalPartsPartDetailNormalizer } from "../normalizers/global-parts-part-detail-normalizer/global-parts-part-detail-normalizer";
import { RepuestosMaxPartDetailNormalizer } from "../normalizers/repuestos-max-part-detail-normalizer/repuestos-max-part-detail-normalizer";
import { GetPartDetailInfoUseCase } from "../get-part-detail-info-use-case/get-part-detail-info-use-case";
import { PartProviders } from "src/constants/part-providers-enum";
import { AutoPartsPlusPartDetailNormalizer } from "../normalizers/auto-parts-plus-part-detail-normalizer/auto-parts-plus-part-detail-normalizer";

export class GetPartDetailsEntrypoint {

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


        return getPartDetailsUseCase.execute(id, provider);
    }
}
