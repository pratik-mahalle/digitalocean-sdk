import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ReservedIp, ReservedIpLoadMatch, ReservedIpListMatch, ReservedIpCreateData, ReservedIpRemoveMatch } from '../DigitaloceanTypes';
declare class ReservedIpEntity extends DigitaloceanEntityBase<ReservedIp> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ReservedIpEntity): ReservedIpEntity;
    load(this: any, reqmatch?: ReservedIpLoadMatch, ctrl?: Control): Promise<ReservedIpEntity>;
    list(this: any, reqmatch?: ReservedIpListMatch, ctrl?: Control): Promise<ReservedIpEntity[]>;
    create(this: any, reqdata?: ReservedIpCreateData, ctrl?: Control): Promise<ReservedIpEntity>;
    remove(this: any, reqmatch?: ReservedIpRemoveMatch, ctrl?: Control): Promise<ReservedIpEntity>;
}
export { ReservedIpEntity };
