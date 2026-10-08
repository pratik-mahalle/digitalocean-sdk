import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiIndexedDataSource, ApiIndexedDataSourceListMatch } from '../DigitaloceanTypes';
declare class ApiIndexedDataSourceEntity extends DigitaloceanEntityBase<ApiIndexedDataSource> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiIndexedDataSourceEntity): ApiIndexedDataSourceEntity;
    list(this: any, reqmatch?: ApiIndexedDataSourceListMatch, ctrl?: Control): Promise<ApiIndexedDataSourceEntity[]>;
}
export { ApiIndexedDataSourceEntity };
