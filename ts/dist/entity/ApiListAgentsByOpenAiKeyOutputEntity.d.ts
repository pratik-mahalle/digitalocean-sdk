import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListAgentsByOpenAiKeyOutput, ApiListAgentsByOpenAiKeyOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListAgentsByOpenAiKeyOutputEntity extends DigitaloceanEntityBase<ApiListAgentsByOpenAiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListAgentsByOpenAiKeyOutputEntity): ApiListAgentsByOpenAiKeyOutputEntity;
    list(this: any, reqmatch?: ApiListAgentsByOpenAiKeyOutputListMatch, ctrl?: Control): Promise<ApiListAgentsByOpenAiKeyOutputEntity[]>;
}
export { ApiListAgentsByOpenAiKeyOutputEntity };
