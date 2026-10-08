import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VectordbGetVectorDbAdminCredential, VectordbGetVectorDbAdminCredentialLoadMatch } from '../DigitaloceanTypes';
declare class VectordbGetVectorDbAdminCredentialEntity extends DigitaloceanEntityBase<VectordbGetVectorDbAdminCredential> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VectordbGetVectorDbAdminCredentialEntity): VectordbGetVectorDbAdminCredentialEntity;
    load(this: any, reqmatch?: VectordbGetVectorDbAdminCredentialLoadMatch, ctrl?: Control): Promise<VectordbGetVectorDbAdminCredentialEntity>;
}
export { VectordbGetVectorDbAdminCredentialEntity };
