import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUnlinkAgentGuardrailOutput, ApiUnlinkAgentGuardrailOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiUnlinkAgentGuardrailOutputEntity extends DigitaloceanEntityBase<ApiUnlinkAgentGuardrailOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUnlinkAgentGuardrailOutputEntity): ApiUnlinkAgentGuardrailOutputEntity;
    remove(this: any, reqmatch?: ApiUnlinkAgentGuardrailOutputRemoveMatch, ctrl?: Control): Promise<ApiUnlinkAgentGuardrailOutputEntity>;
}
export { ApiUnlinkAgentGuardrailOutputEntity };
