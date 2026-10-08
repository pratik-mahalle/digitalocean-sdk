import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiPrompt, ApiPromptLoadMatch } from '../DigitaloceanTypes';
declare class ApiPromptEntity extends DigitaloceanEntityBase<ApiPrompt> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiPromptEntity): ApiPromptEntity;
    load(this: any, reqmatch?: ApiPromptLoadMatch, ctrl?: Control): Promise<ApiPromptEntity>;
}
export { ApiPromptEntity };
