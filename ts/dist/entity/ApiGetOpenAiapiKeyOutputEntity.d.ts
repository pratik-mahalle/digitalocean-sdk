import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetOpenAiapiKeyOutput, ApiGetOpenAiapiKeyOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetOpenAiapiKeyOutputEntity extends DigitaloceanEntityBase<ApiGetOpenAiapiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetOpenAiapiKeyOutputEntity): ApiGetOpenAiapiKeyOutputEntity;
    load(this: any, reqmatch?: ApiGetOpenAiapiKeyOutputLoadMatch, ctrl?: Control): Promise<ApiGetOpenAiapiKeyOutputEntity>;
}
export { ApiGetOpenAiapiKeyOutputEntity };
