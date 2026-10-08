import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListAgentApiKeysOutput, ApiListAgentApiKeysOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListAgentApiKeysOutputEntity extends DigitaloceanEntityBase<ApiListAgentApiKeysOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListAgentApiKeysOutputEntity): ApiListAgentApiKeysOutputEntity;
    list(this: any, reqmatch?: ApiListAgentApiKeysOutputListMatch, ctrl?: Control): Promise<ApiListAgentApiKeysOutputEntity[]>;
}
export { ApiListAgentApiKeysOutputEntity };
