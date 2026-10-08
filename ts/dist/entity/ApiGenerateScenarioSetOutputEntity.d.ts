import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGenerateScenarioSetOutput, ApiGenerateScenarioSetOutputCreateData } from '../DigitaloceanTypes';
declare class ApiGenerateScenarioSetOutputEntity extends DigitaloceanEntityBase<ApiGenerateScenarioSetOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGenerateScenarioSetOutputEntity): ApiGenerateScenarioSetOutputEntity;
    create(this: any, reqdata?: ApiGenerateScenarioSetOutputCreateData, ctrl?: Control): Promise<ApiGenerateScenarioSetOutputEntity>;
}
export { ApiGenerateScenarioSetOutputEntity };
