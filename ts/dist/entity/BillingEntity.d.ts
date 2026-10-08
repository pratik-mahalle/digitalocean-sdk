import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Billing, BillingLoadMatch, BillingListMatch } from '../DigitaloceanTypes';
declare class BillingEntity extends DigitaloceanEntityBase<Billing> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: BillingEntity): BillingEntity;
    load(this: any, reqmatch?: BillingLoadMatch, ctrl?: Control): Promise<BillingEntity>;
    list(this: any, reqmatch?: BillingListMatch, ctrl?: Control): Promise<BillingEntity[]>;
}
export { BillingEntity };
