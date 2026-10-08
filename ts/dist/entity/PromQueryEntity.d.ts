import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { PromQuery, PromQueryLoadMatch, PromQueryCreateData } from '../DigitaloceanTypes';
declare class PromQueryEntity extends DigitaloceanEntityBase<PromQuery> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: PromQueryEntity): PromQueryEntity;
    load(this: any, reqmatch?: PromQueryLoadMatch, ctrl?: Control): Promise<PromQueryEntity>;
    create(this: any, reqdata?: PromQueryCreateData, ctrl?: Control): Promise<PromQueryEntity>;
}
export { PromQueryEntity };
