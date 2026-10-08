import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Insight, InsightLoadMatch, InsightListMatch, InsightCreateData, InsightUpdateData, InsightRemoveMatch } from '../DigitaloceanTypes';
declare class InsightEntity extends DigitaloceanEntityBase<Insight> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: InsightEntity): InsightEntity;
    load(this: any, reqmatch?: InsightLoadMatch, ctrl?: Control): Promise<InsightEntity>;
    list(this: any, reqmatch?: InsightListMatch, ctrl?: Control): Promise<InsightEntity[]>;
    create(this: any, reqdata?: InsightCreateData, ctrl?: Control): Promise<InsightEntity>;
    update(this: any, reqdata?: InsightUpdateData, ctrl?: Control): Promise<InsightEntity>;
    remove(this: any, reqmatch?: InsightRemoveMatch, ctrl?: Control): Promise<InsightEntity>;
}
export { InsightEntity };
