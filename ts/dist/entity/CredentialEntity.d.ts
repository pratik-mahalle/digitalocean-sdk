import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Credential, CredentialLoadMatch } from '../DigitaloceanTypes';
declare class CredentialEntity extends DigitaloceanEntityBase<Credential> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: CredentialEntity): CredentialEntity;
    load(this: any, reqmatch?: CredentialLoadMatch, ctrl?: Control): Promise<CredentialEntity>;
}
export { CredentialEntity };
