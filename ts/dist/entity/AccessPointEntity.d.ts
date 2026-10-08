import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AccessPoint, AccessPointLoadMatch, AccessPointListMatch, AccessPointCreateData, AccessPointRemoveMatch } from '../DigitaloceanTypes';
declare class AccessPointEntity extends DigitaloceanEntityBase<AccessPoint> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AccessPointEntity): AccessPointEntity;
    load(this: any, reqmatch?: AccessPointLoadMatch, ctrl?: Control): Promise<AccessPointEntity>;
    list(this: any, reqmatch?: AccessPointListMatch, ctrl?: Control): Promise<AccessPointEntity[]>;
    create(this: any, reqdata?: AccessPointCreateData, ctrl?: Control): Promise<AccessPointEntity>;
    remove(this: any, reqmatch?: AccessPointRemoveMatch, ctrl?: Control): Promise<AccessPointEntity>;
}
export { AccessPointEntity };
