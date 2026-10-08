import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VectordbGetVectorDb, VectordbGetVectorDbLoadMatch, VectordbGetVectorDbListMatch, VectordbGetVectorDbCreateData } from '../DigitaloceanTypes';
declare class VectordbGetVectorDbEntity extends DigitaloceanEntityBase<VectordbGetVectorDb> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VectordbGetVectorDbEntity): VectordbGetVectorDbEntity;
    load(this: any, reqmatch?: VectordbGetVectorDbLoadMatch, ctrl?: Control): Promise<VectordbGetVectorDbEntity>;
    list(this: any, reqmatch?: VectordbGetVectorDbListMatch, ctrl?: Control): Promise<VectordbGetVectorDbEntity[]>;
    create(this: any, reqdata?: VectordbGetVectorDbCreateData, ctrl?: Control): Promise<VectordbGetVectorDbEntity>;
}
export { VectordbGetVectorDbEntity };
