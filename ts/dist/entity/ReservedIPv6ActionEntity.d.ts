import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ReservedIPv6Action, ReservedIPv6ActionCreateData } from '../DigitaloceanTypes';
declare class ReservedIPv6ActionEntity extends DigitaloceanEntityBase<ReservedIPv6Action> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ReservedIPv6ActionEntity): ReservedIPv6ActionEntity;
    create(this: any, reqdata?: ReservedIPv6ActionCreateData, ctrl?: Control): Promise<ReservedIPv6ActionEntity>;
}
export { ReservedIPv6ActionEntity };
