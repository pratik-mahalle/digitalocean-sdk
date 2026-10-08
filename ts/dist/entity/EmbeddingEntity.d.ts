import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Embedding, EmbeddingCreateData } from '../DigitaloceanTypes';
declare class EmbeddingEntity extends DigitaloceanEntityBase<Embedding> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: EmbeddingEntity): EmbeddingEntity;
    create(this: any, reqdata?: EmbeddingCreateData, ctrl?: Control): Promise<EmbeddingEntity>;
}
export { EmbeddingEntity };
