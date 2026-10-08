import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Balance, BalanceLoadMatch } from '../DigitaloceanTypes';
declare class BalanceEntity extends DigitaloceanEntityBase<Balance> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: BalanceEntity): BalanceEntity;
    load(this: any, reqmatch?: BalanceLoadMatch, ctrl?: Control): Promise<BalanceEntity>;
}
export { BalanceEntity };
