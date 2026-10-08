import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ActorLimit, ActorLimitListMatch } from '../DigitaloceanTypes';
declare class ActorLimitEntity extends DigitaloceanEntityBase<ActorLimit> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ActorLimitEntity): ActorLimitEntity;
    list(this: any, reqmatch?: ActorLimitListMatch, ctrl?: Control): Promise<ActorLimitEntity[]>;
}
export { ActorLimitEntity };
