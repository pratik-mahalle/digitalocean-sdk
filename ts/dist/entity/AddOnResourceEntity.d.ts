import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AddOnResource, AddOnResourceLoadMatch, AddOnResourceListMatch, AddOnResourceCreateData, AddOnResourceUpdateData, AddOnResourceRemoveMatch } from '../DigitaloceanTypes';
declare class AddOnResourceEntity extends DigitaloceanEntityBase<AddOnResource> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AddOnResourceEntity): AddOnResourceEntity;
    load(this: any, reqmatch?: AddOnResourceLoadMatch, ctrl?: Control): Promise<AddOnResourceEntity>;
    list(this: any, reqmatch?: AddOnResourceListMatch, ctrl?: Control): Promise<AddOnResourceEntity[]>;
    create(this: any, reqdata?: AddOnResourceCreateData, ctrl?: Control): Promise<AddOnResourceEntity>;
    update(this: any, reqdata?: AddOnResourceUpdateData, ctrl?: Control): Promise<AddOnResourceEntity>;
    remove(this: any, reqmatch?: AddOnResourceRemoveMatch, ctrl?: Control): Promise<AddOnResourceEntity>;
}
export { AddOnResourceEntity };
