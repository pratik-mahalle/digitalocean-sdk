import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateWorkspaceOutput, ApiUpdateWorkspaceOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateWorkspaceOutputEntity extends DigitaloceanEntityBase<ApiUpdateWorkspaceOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateWorkspaceOutputEntity): ApiUpdateWorkspaceOutputEntity;
    update(this: any, reqdata?: ApiUpdateWorkspaceOutputUpdateData, ctrl?: Control): Promise<ApiUpdateWorkspaceOutputEntity>;
}
export { ApiUpdateWorkspaceOutputEntity };
