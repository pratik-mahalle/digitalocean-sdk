import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ListToolbeltProvider, ListToolbeltProviderListMatch } from '../DigitaloceanTypes';
declare class ListToolbeltProviderEntity extends DigitaloceanEntityBase<ListToolbeltProvider> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ListToolbeltProviderEntity): ListToolbeltProviderEntity;
    list(this: any, reqmatch?: ListToolbeltProviderListMatch, ctrl?: Control): Promise<ListToolbeltProviderEntity[]>;
}
export { ListToolbeltProviderEntity };
