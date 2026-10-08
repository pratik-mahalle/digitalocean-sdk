import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Region, RegionListMatch } from '../DigitaloceanTypes';
declare class RegionEntity extends DigitaloceanEntityBase<Region> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: RegionEntity): RegionEntity;
    list(this: any, reqmatch?: RegionListMatch, ctrl?: Control): Promise<RegionEntity[]>;
}
export { RegionEntity };
