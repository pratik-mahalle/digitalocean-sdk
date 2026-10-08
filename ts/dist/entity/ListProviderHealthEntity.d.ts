import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ListProviderHealth, ListProviderHealthListMatch } from '../DigitaloceanTypes';
declare class ListProviderHealthEntity extends DigitaloceanEntityBase<ListProviderHealth> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ListProviderHealthEntity): ListProviderHealthEntity;
    list(this: any, reqmatch?: ListProviderHealthListMatch, ctrl?: Control): Promise<ListProviderHealthEntity[]>;
}
export { ListProviderHealthEntity };
