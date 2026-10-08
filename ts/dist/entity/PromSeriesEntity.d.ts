import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { PromSeries, PromSeriesListMatch, PromSeriesCreateData } from '../DigitaloceanTypes';
declare class PromSeriesEntity extends DigitaloceanEntityBase<PromSeries> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: PromSeriesEntity): PromSeriesEntity;
    list(this: any, reqmatch?: PromSeriesListMatch, ctrl?: Control): Promise<PromSeriesEntity[]>;
    create(this: any, reqdata?: PromSeriesCreateData, ctrl?: Control): Promise<PromSeriesEntity>;
}
export { PromSeriesEntity };
