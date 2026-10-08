import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Uptime, UptimeLoadMatch, UptimeListMatch, UptimeCreateData, UptimeUpdateData, UptimeRemoveMatch } from '../DigitaloceanTypes';
declare class UptimeEntity extends DigitaloceanEntityBase<Uptime> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: UptimeEntity): UptimeEntity;
    load(this: any, reqmatch?: UptimeLoadMatch, ctrl?: Control): Promise<UptimeEntity>;
    list(this: any, reqmatch?: UptimeListMatch, ctrl?: Control): Promise<UptimeEntity[]>;
    create(this: any, reqdata?: UptimeCreateData, ctrl?: Control): Promise<UptimeEntity>;
    update(this: any, reqdata?: UptimeUpdateData, ctrl?: Control): Promise<UptimeEntity>;
    remove(this: any, reqmatch?: UptimeRemoveMatch, ctrl?: Control): Promise<UptimeEntity>;
}
export { UptimeEntity };
