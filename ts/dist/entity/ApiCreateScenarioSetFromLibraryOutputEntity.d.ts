import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiCreateScenarioSetFromLibraryOutput, ApiCreateScenarioSetFromLibraryOutputCreateData } from '../DigitaloceanTypes';
declare class ApiCreateScenarioSetFromLibraryOutputEntity extends DigitaloceanEntityBase<ApiCreateScenarioSetFromLibraryOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiCreateScenarioSetFromLibraryOutputEntity): ApiCreateScenarioSetFromLibraryOutputEntity;
    create(this: any, reqdata?: ApiCreateScenarioSetFromLibraryOutputCreateData, ctrl?: Control): Promise<ApiCreateScenarioSetFromLibraryOutputEntity>;
}
export { ApiCreateScenarioSetFromLibraryOutputEntity };
