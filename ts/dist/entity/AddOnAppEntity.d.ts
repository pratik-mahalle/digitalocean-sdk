import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AddOnApp, AddOnAppListMatch } from '../DigitaloceanTypes';
declare class AddOnAppEntity extends DigitaloceanEntityBase<AddOnApp> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AddOnAppEntity): AddOnAppEntity;
    list(this: any, reqmatch?: AddOnAppListMatch, ctrl?: Control): Promise<AddOnAppEntity[]>;
}
export { AddOnAppEntity };
