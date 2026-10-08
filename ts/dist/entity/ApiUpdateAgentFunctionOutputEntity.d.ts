import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateAgentFunctionOutput, ApiUpdateAgentFunctionOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateAgentFunctionOutputEntity extends DigitaloceanEntityBase<ApiUpdateAgentFunctionOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateAgentFunctionOutputEntity): ApiUpdateAgentFunctionOutputEntity;
    update(this: any, reqdata?: ApiUpdateAgentFunctionOutputUpdateData, ctrl?: Control): Promise<ApiUpdateAgentFunctionOutputEntity>;
}
export { ApiUpdateAgentFunctionOutputEntity };
