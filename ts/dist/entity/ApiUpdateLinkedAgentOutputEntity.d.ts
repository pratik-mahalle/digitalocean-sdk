import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateLinkedAgentOutput, ApiUpdateLinkedAgentOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateLinkedAgentOutputEntity extends DigitaloceanEntityBase<ApiUpdateLinkedAgentOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateLinkedAgentOutputEntity): ApiUpdateLinkedAgentOutputEntity;
    update(this: any, reqdata?: ApiUpdateLinkedAgentOutputUpdateData, ctrl?: Control): Promise<ApiUpdateLinkedAgentOutputEntity>;
}
export { ApiUpdateLinkedAgentOutputEntity };
