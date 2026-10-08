import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AssociatedResourceStatus, AssociatedResourceStatusLoadMatch } from '../DigitaloceanTypes';
declare class AssociatedResourceStatusEntity extends DigitaloceanEntityBase<AssociatedResourceStatus> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AssociatedResourceStatusEntity): AssociatedResourceStatusEntity;
    load(this: any, reqmatch?: AssociatedResourceStatusLoadMatch, ctrl?: Control): Promise<AssociatedResourceStatusEntity>;
}
export { AssociatedResourceStatusEntity };
