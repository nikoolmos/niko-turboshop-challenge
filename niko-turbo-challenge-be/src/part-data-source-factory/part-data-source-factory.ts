import { PartDataSource } from 'src/part-data-source/part-data-source';
import PartDataSourceConfig from '../configs/part-data-source-config.json';
import { AutoPartsPlusPartDataNormalizer } from 'src/auto-parts-plus-part-data-normalizer/auto-parts-plus-part-data-normalizer';
import { PartProviders } from 'src/constants/part-providers-enum';
import { RepuestosMaxPartDataNormalizer } from 'src/repuestos-max-part-data-normalizer/repuestos-max-part-data-normalizer';

export class PartDataSourceFactory {

    public static createPartDataSources() {
        const datasources: Array<PartDataSource> = [];
        const {sources} = PartDataSourceConfig;

        for (const configFragment of sources) {
            const myPartDataNormalizer = this.getPartDataNormalizer(PartProviders[configFragment.partProviderName])!;
            const myPartDataSource = new PartDataSource(configFragment.baseUrl, configFragment.catalogEndpoint, configFragment.itemEndpoint, configFragment.infoEndpoint, myPartDataNormalizer);
            datasources.push(myPartDataSource);
        }

        return datasources;
    }

    private static getPartDataNormalizer(partProviderName: PartProviders) {
        switch(partProviderName) {
            case PartProviders.AUTO_PARTS_PLUS: 
                return new AutoPartsPlusPartDataNormalizer();
            case PartProviders.REPUESTOS_MAX:
                return new RepuestosMaxPartDataNormalizer();
            case PartProviders.GLOBAL_PARTS:
                return;
        }
    }

}
