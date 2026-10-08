import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteScheduledIndexingOutput, ApiDeleteScheduledIndexingOutputCreateData, ApiDeleteScheduledIndexingOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteScheduledIndexingOutputEntity extends DigitaloceanEntityBase<ApiDeleteScheduledIndexingOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteScheduledIndexingOutputEntity): ApiDeleteScheduledIndexingOutputEntity;
    create(this: any, reqdata?: ApiDeleteScheduledIndexingOutputCreateData, ctrl?: Control): Promise<ApiDeleteScheduledIndexingOutputEntity>;
    remove(this: any, reqmatch?: ApiDeleteScheduledIndexingOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteScheduledIndexingOutputEntity>;
}
export { ApiDeleteScheduledIndexingOutputEntity };
