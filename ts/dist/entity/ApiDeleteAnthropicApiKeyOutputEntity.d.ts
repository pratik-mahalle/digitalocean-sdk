import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteAnthropicApiKeyOutput, ApiDeleteAnthropicApiKeyOutputListMatch, ApiDeleteAnthropicApiKeyOutputCreateData, ApiDeleteAnthropicApiKeyOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteAnthropicApiKeyOutputEntity extends DigitaloceanEntityBase<ApiDeleteAnthropicApiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteAnthropicApiKeyOutputEntity): ApiDeleteAnthropicApiKeyOutputEntity;
    list(this: any, reqmatch?: ApiDeleteAnthropicApiKeyOutputListMatch, ctrl?: Control): Promise<ApiDeleteAnthropicApiKeyOutputEntity[]>;
    create(this: any, reqdata?: ApiDeleteAnthropicApiKeyOutputCreateData, ctrl?: Control): Promise<ApiDeleteAnthropicApiKeyOutputEntity>;
    remove(this: any, reqmatch?: ApiDeleteAnthropicApiKeyOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteAnthropicApiKeyOutputEntity>;
}
export { ApiDeleteAnthropicApiKeyOutputEntity };
