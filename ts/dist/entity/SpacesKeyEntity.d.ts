import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { SpacesKey, SpacesKeyLoadMatch, SpacesKeyListMatch, SpacesKeyCreateData, SpacesKeyUpdateData, SpacesKeyPatchData, SpacesKeyRemoveMatch } from '../DigitaloceanTypes';
declare class SpacesKeyEntity extends DigitaloceanEntityBase<SpacesKey> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SpacesKeyEntity): SpacesKeyEntity;
    load(this: any, reqmatch?: SpacesKeyLoadMatch, ctrl?: Control): Promise<SpacesKeyEntity>;
    list(this: any, reqmatch?: SpacesKeyListMatch, ctrl?: Control): Promise<SpacesKeyEntity[]>;
    create(this: any, reqdata?: SpacesKeyCreateData, ctrl?: Control): Promise<SpacesKeyEntity>;
    update(this: any, reqdata?: SpacesKeyUpdateData, ctrl?: Control): Promise<SpacesKeyEntity>;
    patch(this: any, reqdata?: SpacesKeyPatchData, ctrl?: Control): Promise<SpacesKeyEntity>;
    remove(this: any, reqmatch?: SpacesKeyRemoveMatch, ctrl?: Control): Promise<SpacesKeyEntity>;
}
export { SpacesKeyEntity };
