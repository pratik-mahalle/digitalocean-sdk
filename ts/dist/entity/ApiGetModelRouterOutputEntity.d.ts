import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetModelRouterOutput, ApiGetModelRouterOutputLoadMatch, ApiGetModelRouterOutputListMatch, ApiGetModelRouterOutputCreateData } from '../DigitaloceanTypes';
declare class ApiGetModelRouterOutputEntity extends DigitaloceanEntityBase<ApiGetModelRouterOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetModelRouterOutputEntity): ApiGetModelRouterOutputEntity;
    load(this: any, reqmatch?: ApiGetModelRouterOutputLoadMatch, ctrl?: Control): Promise<ApiGetModelRouterOutputEntity>;
    list(this: any, reqmatch?: ApiGetModelRouterOutputListMatch, ctrl?: Control): Promise<ApiGetModelRouterOutputEntity[]>;
    create(this: any, reqdata?: ApiGetModelRouterOutputCreateData, ctrl?: Control): Promise<ApiGetModelRouterOutputEntity>;
}
export { ApiGetModelRouterOutputEntity };
