import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { FloatingIp, FloatingIpLoadMatch, FloatingIpListMatch, FloatingIpCreateData, FloatingIpRemoveMatch } from '../DigitaloceanTypes';
declare class FloatingIpEntity extends DigitaloceanEntityBase<FloatingIp> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: FloatingIpEntity): FloatingIpEntity;
    load(this: any, reqmatch?: FloatingIpLoadMatch, ctrl?: Control): Promise<FloatingIpEntity>;
    list(this: any, reqmatch?: FloatingIpListMatch, ctrl?: Control): Promise<FloatingIpEntity[]>;
    create(this: any, reqdata?: FloatingIpCreateData, ctrl?: Control): Promise<FloatingIpEntity>;
    remove(this: any, reqmatch?: FloatingIpRemoveMatch, ctrl?: Control): Promise<FloatingIpEntity>;
}
export { FloatingIpEntity };
