import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListScenariosOutput, ApiListScenariosOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListScenariosOutputEntity extends DigitaloceanEntityBase<ApiListScenariosOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListScenariosOutputEntity): ApiListScenariosOutputEntity;
    list(this: any, reqmatch?: ApiListScenariosOutputListMatch, ctrl?: Control): Promise<ApiListScenariosOutputEntity[]>;
}
export { ApiListScenariosOutputEntity };
