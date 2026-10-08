import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Firewall, FirewallLoadMatch, FirewallListMatch, FirewallCreateData, FirewallUpdateData, FirewallRemoveMatch } from '../DigitaloceanTypes';
declare class FirewallEntity extends DigitaloceanEntityBase<Firewall> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: FirewallEntity): FirewallEntity;
    load(this: any, reqmatch?: FirewallLoadMatch, ctrl?: Control): Promise<FirewallEntity>;
    list(this: any, reqmatch?: FirewallListMatch, ctrl?: Control): Promise<FirewallEntity[]>;
    create(this: any, reqdata?: FirewallCreateData, ctrl?: Control): Promise<FirewallEntity>;
    update(this: any, reqdata?: FirewallUpdateData, ctrl?: Control): Promise<FirewallEntity>;
    remove(this: any, reqmatch?: FirewallRemoveMatch, ctrl?: Control): Promise<FirewallEntity>;
}
export { FirewallEntity };
