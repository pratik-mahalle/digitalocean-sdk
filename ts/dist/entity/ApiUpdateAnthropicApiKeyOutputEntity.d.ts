import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateAnthropicApiKeyOutput, ApiUpdateAnthropicApiKeyOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateAnthropicApiKeyOutputEntity extends DigitaloceanEntityBase<ApiUpdateAnthropicApiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateAnthropicApiKeyOutputEntity): ApiUpdateAnthropicApiKeyOutputEntity;
    update(this: any, reqdata?: ApiUpdateAnthropicApiKeyOutputUpdateData, ctrl?: Control): Promise<ApiUpdateAnthropicApiKeyOutputEntity>;
}
export { ApiUpdateAnthropicApiKeyOutputEntity };
