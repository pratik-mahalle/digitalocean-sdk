import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetScenarioSetOutput, ApiGetScenarioSetOutputLoadMatch, ApiGetScenarioSetOutputListMatch, ApiGetScenarioSetOutputCreateData } from '../DigitaloceanTypes';
declare class ApiGetScenarioSetOutputEntity extends DigitaloceanEntityBase<ApiGetScenarioSetOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetScenarioSetOutputEntity): ApiGetScenarioSetOutputEntity;
    load(this: any, reqmatch?: ApiGetScenarioSetOutputLoadMatch, ctrl?: Control): Promise<ApiGetScenarioSetOutputEntity>;
    list(this: any, reqmatch?: ApiGetScenarioSetOutputListMatch, ctrl?: Control): Promise<ApiGetScenarioSetOutputEntity[]>;
    create(this: any, reqdata?: ApiGetScenarioSetOutputCreateData, ctrl?: Control): Promise<ApiGetScenarioSetOutputEntity>;
}
export { ApiGetScenarioSetOutputEntity };
