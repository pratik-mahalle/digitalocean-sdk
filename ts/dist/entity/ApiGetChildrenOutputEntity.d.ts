import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetChildrenOutput, ApiGetChildrenOutputListMatch } from '../DigitaloceanTypes';
declare class ApiGetChildrenOutputEntity extends DigitaloceanEntityBase<ApiGetChildrenOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetChildrenOutputEntity): ApiGetChildrenOutputEntity;
    list(this: any, reqmatch?: ApiGetChildrenOutputListMatch, ctrl?: Control): Promise<ApiGetChildrenOutputEntity[]>;
}
export { ApiGetChildrenOutputEntity };
