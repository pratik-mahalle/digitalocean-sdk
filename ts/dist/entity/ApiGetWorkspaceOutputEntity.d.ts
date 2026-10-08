import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetWorkspaceOutput, ApiGetWorkspaceOutputLoadMatch, ApiGetWorkspaceOutputListMatch, ApiGetWorkspaceOutputCreateData } from '../DigitaloceanTypes';
declare class ApiGetWorkspaceOutputEntity extends DigitaloceanEntityBase<ApiGetWorkspaceOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetWorkspaceOutputEntity): ApiGetWorkspaceOutputEntity;
    load(this: any, reqmatch?: ApiGetWorkspaceOutputLoadMatch, ctrl?: Control): Promise<ApiGetWorkspaceOutputEntity>;
    list(this: any, reqmatch?: ApiGetWorkspaceOutputListMatch, ctrl?: Control): Promise<ApiGetWorkspaceOutputEntity[]>;
    create(this: any, reqdata?: ApiGetWorkspaceOutputCreateData, ctrl?: Control): Promise<ApiGetWorkspaceOutputEntity>;
}
export { ApiGetWorkspaceOutputEntity };
