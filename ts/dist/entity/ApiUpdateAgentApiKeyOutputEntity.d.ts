import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateAgentApiKeyOutput, ApiUpdateAgentApiKeyOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateAgentApiKeyOutputEntity extends DigitaloceanEntityBase<ApiUpdateAgentApiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateAgentApiKeyOutputEntity): ApiUpdateAgentApiKeyOutputEntity;
    update(this: any, reqdata?: ApiUpdateAgentApiKeyOutputUpdateData, ctrl?: Control): Promise<ApiUpdateAgentApiKeyOutputEntity>;
}
export { ApiUpdateAgentApiKeyOutputEntity };
