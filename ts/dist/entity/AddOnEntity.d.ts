import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AddOn, AddOnLoadMatch, AddOnListMatch, AddOnCreateData, AddOnUpdateData, AddOnRemoveMatch } from '../DigitaloceanTypes';
declare class AddOnEntity extends DigitaloceanEntityBase<AddOn> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AddOnEntity): AddOnEntity;
    load(this: any, reqmatch?: AddOnLoadMatch, ctrl?: Control): Promise<AddOnEntity>;
    list(this: any, reqmatch?: AddOnListMatch, ctrl?: Control): Promise<AddOnEntity[]>;
    create(this: any, reqdata?: AddOnCreateData, ctrl?: Control): Promise<AddOnEntity>;
    update(this: any, reqdata?: AddOnUpdateData, ctrl?: Control): Promise<AddOnEntity>;
    remove(this: any, reqmatch?: AddOnRemoveMatch, ctrl?: Control): Promise<AddOnEntity>;
}
export { AddOnEntity };
