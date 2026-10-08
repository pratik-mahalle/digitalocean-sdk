import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateScenarioSetOutput, ApiUpdateScenarioSetOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateScenarioSetOutputEntity extends DigitaloceanEntityBase<ApiUpdateScenarioSetOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateScenarioSetOutputEntity): ApiUpdateScenarioSetOutputEntity;
    update(this: any, reqdata?: ApiUpdateScenarioSetOutputUpdateData, ctrl?: Control): Promise<ApiUpdateScenarioSetOutputEntity>;
}
export { ApiUpdateScenarioSetOutputEntity };
