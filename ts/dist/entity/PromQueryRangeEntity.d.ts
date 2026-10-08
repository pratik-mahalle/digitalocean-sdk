import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { PromQueryRange, PromQueryRangeLoadMatch, PromQueryRangeCreateData } from '../DigitaloceanTypes';
declare class PromQueryRangeEntity extends DigitaloceanEntityBase<PromQueryRange> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: PromQueryRangeEntity): PromQueryRangeEntity;
    load(this: any, reqmatch?: PromQueryRangeLoadMatch, ctrl?: Control): Promise<PromQueryRangeEntity>;
    create(this: any, reqdata?: PromQueryRangeCreateData, ctrl?: Control): Promise<PromQueryRangeEntity>;
}
export { PromQueryRangeEntity };
