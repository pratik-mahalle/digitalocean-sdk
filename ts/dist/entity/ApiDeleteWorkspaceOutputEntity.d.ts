import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteWorkspaceOutput, ApiDeleteWorkspaceOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteWorkspaceOutputEntity extends DigitaloceanEntityBase<ApiDeleteWorkspaceOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteWorkspaceOutputEntity): ApiDeleteWorkspaceOutputEntity;
    remove(this: any, reqmatch?: ApiDeleteWorkspaceOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteWorkspaceOutputEntity>;
}
export { ApiDeleteWorkspaceOutputEntity };
