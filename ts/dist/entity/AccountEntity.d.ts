import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Account, AccountLoadMatch } from '../DigitaloceanTypes';
declare class AccountEntity extends DigitaloceanEntityBase<Account> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AccountEntity): AccountEntity;
    load(this: any, reqmatch?: AccountLoadMatch, ctrl?: Control): Promise<AccountEntity>;
}
export { AccountEntity };
