import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiMoveAgentsToWorkspaceOutput, ApiMoveAgentsToWorkspaceOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiMoveAgentsToWorkspaceOutputEntity extends DigitaloceanEntityBase<ApiMoveAgentsToWorkspaceOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiMoveAgentsToWorkspaceOutputEntity): ApiMoveAgentsToWorkspaceOutputEntity;
    update(this: any, reqdata?: ApiMoveAgentsToWorkspaceOutputUpdateData, ctrl?: Control): Promise<ApiMoveAgentsToWorkspaceOutputEntity>;
}
export { ApiMoveAgentsToWorkspaceOutputEntity };
