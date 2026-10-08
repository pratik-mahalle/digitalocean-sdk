import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ListProvider, ListProviderListMatch } from '../DigitaloceanTypes';
declare class ListProviderEntity extends DigitaloceanEntityBase<ListProvider> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ListProviderEntity): ListProviderEntity;
    list(this: any, reqmatch?: ListProviderListMatch, ctrl?: Control): Promise<ListProviderEntity[]>;
}
export { ListProviderEntity };
