import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { DockerCredential, DockerCredentialLoadMatch } from '../DigitaloceanTypes';
declare class DockerCredentialEntity extends DigitaloceanEntityBase<DockerCredential> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DockerCredentialEntity): DockerCredentialEntity;
    load(this: any, reqmatch?: DockerCredentialLoadMatch, ctrl?: Control): Promise<DockerCredentialEntity>;
}
export { DockerCredentialEntity };
