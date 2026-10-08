import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Model, ModelListMatch } from '../DigitaloceanTypes';
declare class ModelEntity extends DigitaloceanEntityBase<Model> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ModelEntity): ModelEntity;
    list(this: any, reqmatch?: ModelListMatch, ctrl?: Control): Promise<ModelEntity[]>;
}
export { ModelEntity };
