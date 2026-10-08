import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { SecurityScan, SecurityScanLoadMatch, SecurityScanListMatch, SecurityScanCreateData } from '../DigitaloceanTypes';
declare class SecurityScanEntity extends DigitaloceanEntityBase<SecurityScan> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SecurityScanEntity): SecurityScanEntity;
    load(this: any, reqmatch?: SecurityScanLoadMatch, ctrl?: Control): Promise<SecurityScanEntity>;
    list(this: any, reqmatch?: SecurityScanListMatch, ctrl?: Control): Promise<SecurityScanEntity[]>;
    create(this: any, reqdata?: SecurityScanCreateData, ctrl?: Control): Promise<SecurityScanEntity>;
}
export { SecurityScanEntity };
