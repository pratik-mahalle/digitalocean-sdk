import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ReservedIPv6, ReservedIPv6LoadMatch, ReservedIPv6ListMatch, ReservedIPv6CreateData, ReservedIPv6RemoveMatch } from '../DigitaloceanTypes';
declare class ReservedIPv6Entity extends DigitaloceanEntityBase<ReservedIPv6> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ReservedIPv6Entity): ReservedIPv6Entity;
    load(this: any, reqmatch?: ReservedIPv6LoadMatch, ctrl?: Control): Promise<ReservedIPv6Entity>;
    list(this: any, reqmatch?: ReservedIPv6ListMatch, ctrl?: Control): Promise<ReservedIPv6Entity[]>;
    create(this: any, reqdata?: ReservedIPv6CreateData, ctrl?: Control): Promise<ReservedIPv6Entity>;
    remove(this: any, reqmatch?: ReservedIPv6RemoveMatch, ctrl?: Control): Promise<ReservedIPv6Entity>;
}
export { ReservedIPv6Entity };
