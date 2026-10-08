import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { GenaiapiRegion, GenaiapiRegionListMatch } from '../DigitaloceanTypes';
declare class GenaiapiRegionEntity extends DigitaloceanEntityBase<GenaiapiRegion> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: GenaiapiRegionEntity): GenaiapiRegionEntity;
    list(this: any, reqmatch?: GenaiapiRegionListMatch, ctrl?: Control): Promise<GenaiapiRegionEntity[]>;
}
export { GenaiapiRegionEntity };
