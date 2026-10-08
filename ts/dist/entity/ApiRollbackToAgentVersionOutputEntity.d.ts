import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiRollbackToAgentVersionOutput, ApiRollbackToAgentVersionOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiRollbackToAgentVersionOutputEntity extends DigitaloceanEntityBase<ApiRollbackToAgentVersionOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiRollbackToAgentVersionOutputEntity): ApiRollbackToAgentVersionOutputEntity;
    update(this: any, reqdata?: ApiRollbackToAgentVersionOutputUpdateData, ctrl?: Control): Promise<ApiRollbackToAgentVersionOutputEntity>;
}
export { ApiRollbackToAgentVersionOutputEntity };
