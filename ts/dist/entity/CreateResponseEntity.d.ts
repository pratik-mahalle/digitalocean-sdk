import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { CreateResponse, CreateResponseCreateData } from '../DigitaloceanTypes';
declare class CreateResponseEntity extends DigitaloceanEntityBase<CreateResponse> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: CreateResponseEntity): CreateResponseEntity;
    create(this: any, reqdata?: CreateResponseCreateData, ctrl?: Control): Promise<CreateResponseEntity>;
}
export { CreateResponseEntity };
