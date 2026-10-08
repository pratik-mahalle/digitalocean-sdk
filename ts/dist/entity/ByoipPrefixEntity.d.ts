import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ByoipPrefix, ByoipPrefixLoadMatch, ByoipPrefixListMatch, ByoipPrefixCreateData, ByoipPrefixUpdateData, ByoipPrefixRemoveMatch } from '../DigitaloceanTypes';
declare class ByoipPrefixEntity extends DigitaloceanEntityBase<ByoipPrefix> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ByoipPrefixEntity): ByoipPrefixEntity;
    load(this: any, reqmatch?: ByoipPrefixLoadMatch, ctrl?: Control): Promise<ByoipPrefixEntity>;
    list(this: any, reqmatch?: ByoipPrefixListMatch, ctrl?: Control): Promise<ByoipPrefixEntity[]>;
    create(this: any, reqdata?: ByoipPrefixCreateData, ctrl?: Control): Promise<ByoipPrefixEntity>;
    update(this: any, reqdata?: ByoipPrefixUpdateData, ctrl?: Control): Promise<ByoipPrefixEntity>;
    remove(this: any, reqmatch?: ByoipPrefixRemoveMatch, ctrl?: Control): Promise<ByoipPrefixEntity>;
}
export { ByoipPrefixEntity };
