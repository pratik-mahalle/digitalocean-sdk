import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetScheduledIndexingOutput, ApiGetScheduledIndexingOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetScheduledIndexingOutputEntity extends DigitaloceanEntityBase<ApiGetScheduledIndexingOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetScheduledIndexingOutputEntity): ApiGetScheduledIndexingOutputEntity;
    load(this: any, reqmatch?: ApiGetScheduledIndexingOutputLoadMatch, ctrl?: Control): Promise<ApiGetScheduledIndexingOutputEntity>;
}
export { ApiGetScheduledIndexingOutputEntity };
