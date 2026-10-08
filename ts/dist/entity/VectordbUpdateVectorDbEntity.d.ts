import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VectordbUpdateVectorDb, VectordbUpdateVectorDbUpdateData } from '../DigitaloceanTypes';
declare class VectordbUpdateVectorDbEntity extends DigitaloceanEntityBase<VectordbUpdateVectorDb> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VectordbUpdateVectorDbEntity): VectordbUpdateVectorDbEntity;
    update(this: any, reqdata?: VectordbUpdateVectorDbUpdateData, ctrl?: Control): Promise<VectordbUpdateVectorDbEntity>;
}
export { VectordbUpdateVectorDbEntity };
