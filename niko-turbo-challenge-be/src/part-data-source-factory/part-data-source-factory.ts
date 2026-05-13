import { PartDataSource } from 'src/part-data-source/part-data-source';
import PartDataSourceConfig from '../configs/part-data-source-config.json';

export class PartDataSourceFactory {

    public static createPartDataSources() {
        const datasources: Array<PartDataSource> = [];
        const {sources} = PartDataSourceConfig;

        for (const configFragment of sources) {
            const myPartDataSource = new PartDataSource(configFragment.baseUrl, configFragment.catalogEndpoint, configFragment.itemEndpoint, configFragment.infoEndpoint);
            datasources.push(myPartDataSource);
        }

        return datasources;
    }

}
