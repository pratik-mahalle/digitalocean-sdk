import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Certificate, CertificateLoadMatch, CertificateListMatch, CertificateCreateData, CertificateRemoveMatch } from '../DigitaloceanTypes';
declare class CertificateEntity extends DigitaloceanEntityBase<Certificate> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: CertificateEntity): CertificateEntity;
    load(this: any, reqmatch?: CertificateLoadMatch, ctrl?: Control): Promise<CertificateEntity>;
    list(this: any, reqmatch?: CertificateListMatch, ctrl?: Control): Promise<CertificateEntity[]>;
    create(this: any, reqdata?: CertificateCreateData, ctrl?: Control): Promise<CertificateEntity>;
    remove(this: any, reqmatch?: CertificateRemoveMatch, ctrl?: Control): Promise<CertificateEntity>;
}
export { CertificateEntity };
