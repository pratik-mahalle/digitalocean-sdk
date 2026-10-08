import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ListToolHealth, ListToolHealthListMatch } from '../DigitaloceanTypes';
declare class ListToolHealthEntity extends DigitaloceanEntityBase<ListToolHealth> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ListToolHealthEntity): ListToolHealthEntity;
    list(this: any, reqmatch?: ListToolHealthListMatch, ctrl?: Control): Promise<ListToolHealthEntity[]>;
}
export { ListToolHealthEntity };
