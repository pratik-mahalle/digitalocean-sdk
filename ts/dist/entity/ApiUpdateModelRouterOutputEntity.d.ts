import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateModelRouterOutput, ApiUpdateModelRouterOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateModelRouterOutputEntity extends DigitaloceanEntityBase<ApiUpdateModelRouterOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateModelRouterOutputEntity): ApiUpdateModelRouterOutputEntity;
    update(this: any, reqdata?: ApiUpdateModelRouterOutputUpdateData, ctrl?: Control): Promise<ApiUpdateModelRouterOutputEntity>;
}
export { ApiUpdateModelRouterOutputEntity };
