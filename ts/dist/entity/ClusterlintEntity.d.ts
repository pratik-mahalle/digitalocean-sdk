import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Clusterlint, ClusterlintListMatch } from '../DigitaloceanTypes';
declare class ClusterlintEntity extends DigitaloceanEntityBase<Clusterlint> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ClusterlintEntity): ClusterlintEntity;
    list(this: any, reqmatch?: ClusterlintListMatch, ctrl?: Control): Promise<ClusterlintEntity[]>;
}
export { ClusterlintEntity };
