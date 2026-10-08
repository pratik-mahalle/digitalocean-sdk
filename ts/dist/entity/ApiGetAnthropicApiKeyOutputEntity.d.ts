import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetAnthropicApiKeyOutput, ApiGetAnthropicApiKeyOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetAnthropicApiKeyOutputEntity extends DigitaloceanEntityBase<ApiGetAnthropicApiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetAnthropicApiKeyOutputEntity): ApiGetAnthropicApiKeyOutputEntity;
    load(this: any, reqmatch?: ApiGetAnthropicApiKeyOutputLoadMatch, ctrl?: Control): Promise<ApiGetAnthropicApiKeyOutputEntity>;
}
export { ApiGetAnthropicApiKeyOutputEntity };
