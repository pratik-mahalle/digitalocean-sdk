import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiLinkAgentGuardrailOutput, ApiLinkAgentGuardrailOutputCreateData } from '../DigitaloceanTypes';
declare class ApiLinkAgentGuardrailOutputEntity extends DigitaloceanEntityBase<ApiLinkAgentGuardrailOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiLinkAgentGuardrailOutputEntity): ApiLinkAgentGuardrailOutputEntity;
    create(this: any, reqdata?: ApiLinkAgentGuardrailOutputCreateData, ctrl?: Control): Promise<ApiLinkAgentGuardrailOutputEntity>;
}
export { ApiLinkAgentGuardrailOutputEntity };
