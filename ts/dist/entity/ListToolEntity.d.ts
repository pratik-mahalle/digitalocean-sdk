import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ListTool, ListToolListMatch } from '../DigitaloceanTypes';
declare class ListToolEntity extends DigitaloceanEntityBase<ListTool> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ListToolEntity): ListToolEntity;
    list(this: any, reqmatch?: ListToolListMatch, ctrl?: Control): Promise<ListToolEntity[]>;
}
export { ListToolEntity };
