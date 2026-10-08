import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ListToolkit, ListToolkitListMatch } from '../DigitaloceanTypes';
declare class ListToolkitEntity extends DigitaloceanEntityBase<ListToolkit> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ListToolkitEntity): ListToolkitEntity;
    list(this: any, reqmatch?: ListToolkitListMatch, ctrl?: Control): Promise<ListToolkitEntity[]>;
}
export { ListToolkitEntity };
