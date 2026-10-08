import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListScenarioLibraryOutput, ApiListScenarioLibraryOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListScenarioLibraryOutputEntity extends DigitaloceanEntityBase<ApiListScenarioLibraryOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListScenarioLibraryOutputEntity): ApiListScenarioLibraryOutputEntity;
    list(this: any, reqmatch?: ApiListScenarioLibraryOutputListMatch, ctrl?: Control): Promise<ApiListScenarioLibraryOutputEntity[]>;
}
export { ApiListScenarioLibraryOutputEntity };
