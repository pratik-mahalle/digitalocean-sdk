import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListAgentsByWorkspaceOutput, ApiListAgentsByWorkspaceOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListAgentsByWorkspaceOutputEntity extends DigitaloceanEntityBase<ApiListAgentsByWorkspaceOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListAgentsByWorkspaceOutputEntity): ApiListAgentsByWorkspaceOutputEntity;
    list(this: any, reqmatch?: ApiListAgentsByWorkspaceOutputListMatch, ctrl?: Control): Promise<ApiListAgentsByWorkspaceOutputEntity[]>;
}
export { ApiListAgentsByWorkspaceOutputEntity };
