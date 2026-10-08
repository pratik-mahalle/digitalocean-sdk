import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VectordbUpdateVectorDbTag, VectordbUpdateVectorDbTagUpdateData } from '../DigitaloceanTypes';
declare class VectordbUpdateVectorDbTagEntity extends DigitaloceanEntityBase<VectordbUpdateVectorDbTag> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VectordbUpdateVectorDbTagEntity): VectordbUpdateVectorDbTagEntity;
    update(this: any, reqdata?: VectordbUpdateVectorDbTagUpdateData, ctrl?: Control): Promise<VectordbUpdateVectorDbTagEntity>;
}
export { VectordbUpdateVectorDbTagEntity };
