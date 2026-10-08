import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VectorDatabase, VectorDatabaseRemoveMatch } from '../DigitaloceanTypes';
declare class VectorDatabaseEntity extends DigitaloceanEntityBase<VectorDatabase> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VectorDatabaseEntity): VectorDatabaseEntity;
    remove(this: any, reqmatch?: VectorDatabaseRemoveMatch, ctrl?: Control): Promise<VectorDatabaseEntity>;
}
export { VectorDatabaseEntity };
