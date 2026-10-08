import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteModelRouterOutput, ApiDeleteModelRouterOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteModelRouterOutputEntity extends DigitaloceanEntityBase<ApiDeleteModelRouterOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteModelRouterOutputEntity): ApiDeleteModelRouterOutputEntity;
    remove(this: any, reqmatch?: ApiDeleteModelRouterOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteModelRouterOutputEntity>;
}
export { ApiDeleteModelRouterOutputEntity };
