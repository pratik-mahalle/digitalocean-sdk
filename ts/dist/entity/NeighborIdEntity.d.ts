import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { NeighborId, NeighborIdListMatch } from '../DigitaloceanTypes';
declare class NeighborIdEntity extends DigitaloceanEntityBase<NeighborId> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: NeighborIdEntity): NeighborIdEntity;
    list(this: any, reqmatch?: NeighborIdListMatch, ctrl?: Control): Promise<NeighborIdEntity[]>;
}
export { NeighborIdEntity };
