import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VectordbGetRestoreStatus, VectordbGetRestoreStatusLoadMatch } from '../DigitaloceanTypes';
declare class VectordbGetRestoreStatusEntity extends DigitaloceanEntityBase<VectordbGetRestoreStatus> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VectordbGetRestoreStatusEntity): VectordbGetRestoreStatusEntity;
    load(this: any, reqmatch?: VectordbGetRestoreStatusLoadMatch, ctrl?: Control): Promise<VectordbGetRestoreStatusEntity>;
}
export { VectordbGetRestoreStatusEntity };
