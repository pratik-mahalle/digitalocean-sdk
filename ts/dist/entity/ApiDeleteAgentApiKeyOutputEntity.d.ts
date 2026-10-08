import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteAgentApiKeyOutput, ApiDeleteAgentApiKeyOutputUpdateData, ApiDeleteAgentApiKeyOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteAgentApiKeyOutputEntity extends DigitaloceanEntityBase<ApiDeleteAgentApiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteAgentApiKeyOutputEntity): ApiDeleteAgentApiKeyOutputEntity;
    update(this: any, reqdata?: ApiDeleteAgentApiKeyOutputUpdateData, ctrl?: Control): Promise<ApiDeleteAgentApiKeyOutputEntity>;
    remove(this: any, reqmatch?: ApiDeleteAgentApiKeyOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteAgentApiKeyOutputEntity>;
}
export { ApiDeleteAgentApiKeyOutputEntity };
