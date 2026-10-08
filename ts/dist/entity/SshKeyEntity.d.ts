import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { SshKey, SshKeyLoadMatch, SshKeyListMatch, SshKeyCreateData, SshKeyUpdateData, SshKeyRemoveMatch } from '../DigitaloceanTypes';
declare class SshKeyEntity extends DigitaloceanEntityBase<SshKey> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SshKeyEntity): SshKeyEntity;
    load(this: any, reqmatch?: SshKeyLoadMatch, ctrl?: Control): Promise<SshKeyEntity>;
    list(this: any, reqmatch?: SshKeyListMatch, ctrl?: Control): Promise<SshKeyEntity[]>;
    create(this: any, reqdata?: SshKeyCreateData, ctrl?: Control): Promise<SshKeyEntity>;
    update(this: any, reqdata?: SshKeyUpdateData, ctrl?: Control): Promise<SshKeyEntity>;
    remove(this: any, reqmatch?: SshKeyRemoveMatch, ctrl?: Control): Promise<SshKeyEntity>;
}
export { SshKeyEntity };
