import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteScenarioSetOutput, ApiDeleteScenarioSetOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteScenarioSetOutputEntity extends DigitaloceanEntityBase<ApiDeleteScenarioSetOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteScenarioSetOutputEntity): ApiDeleteScenarioSetOutputEntity;
    remove(this: any, reqmatch?: ApiDeleteScenarioSetOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteScenarioSetOutputEntity>;
}
export { ApiDeleteScenarioSetOutputEntity };
