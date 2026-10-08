import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiCreateAgentApiKeyOutput, ApiCreateAgentApiKeyOutputCreateData } from '../DigitaloceanTypes';
declare class ApiCreateAgentApiKeyOutputEntity extends DigitaloceanEntityBase<ApiCreateAgentApiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiCreateAgentApiKeyOutputEntity): ApiCreateAgentApiKeyOutputEntity;
    create(this: any, reqdata?: ApiCreateAgentApiKeyOutputCreateData, ctrl?: Control): Promise<ApiCreateAgentApiKeyOutputEntity>;
}
export { ApiCreateAgentApiKeyOutputEntity };
