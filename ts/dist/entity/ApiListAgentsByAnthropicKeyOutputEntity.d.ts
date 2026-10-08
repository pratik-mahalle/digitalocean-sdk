import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListAgentsByAnthropicKeyOutput, ApiListAgentsByAnthropicKeyOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListAgentsByAnthropicKeyOutputEntity extends DigitaloceanEntityBase<ApiListAgentsByAnthropicKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListAgentsByAnthropicKeyOutputEntity): ApiListAgentsByAnthropicKeyOutputEntity;
    list(this: any, reqmatch?: ApiListAgentsByAnthropicKeyOutputListMatch, ctrl?: Control): Promise<ApiListAgentsByAnthropicKeyOutputEntity[]>;
}
export { ApiListAgentsByAnthropicKeyOutputEntity };
