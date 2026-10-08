import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppsRegion, AppsRegionListMatch } from '../DigitaloceanTypes';
declare class AppsRegionEntity extends DigitaloceanEntityBase<AppsRegion> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppsRegionEntity): AppsRegionEntity;
    list(this: any, reqmatch?: AppsRegionListMatch, ctrl?: Control): Promise<AppsRegionEntity[]>;
}
export { AppsRegionEntity };
