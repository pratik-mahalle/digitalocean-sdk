import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Empty, EmptyListMatch, EmptyCreateData, EmptyRemoveMatch } from '../DigitaloceanTypes';
declare class EmptyEntity extends DigitaloceanEntityBase<Empty> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: EmptyEntity): EmptyEntity;
    list(this: any, reqmatch?: EmptyListMatch, ctrl?: Control): Promise<EmptyEntity[]>;
    create(this: any, reqdata?: EmptyCreateData, ctrl?: Control): Promise<EmptyEntity>;
    remove(this: any, reqmatch?: EmptyRemoveMatch, ctrl?: Control): Promise<EmptyEntity>;
}
export { EmptyEntity };
