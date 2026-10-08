import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Option, OptionLoadMatch } from '../DigitaloceanTypes';
declare class OptionEntity extends DigitaloceanEntityBase<Option> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: OptionEntity): OptionEntity;
    load(this: any, reqmatch?: OptionLoadMatch, ctrl?: Control): Promise<OptionEntity>;
}
export { OptionEntity };
