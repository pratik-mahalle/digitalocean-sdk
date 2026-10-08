import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateAgentOutput, ApiUpdateAgentOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateAgentOutputEntity extends DigitaloceanEntityBase<ApiUpdateAgentOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateAgentOutputEntity): ApiUpdateAgentOutputEntity;
    update(this: any, reqdata?: ApiUpdateAgentOutputUpdateData, ctrl?: Control): Promise<ApiUpdateAgentOutputEntity>;
}
export { ApiUpdateAgentOutputEntity };
