import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppsInstanceSize, AppsInstanceSizeLoadMatch, AppsInstanceSizeListMatch } from '../DigitaloceanTypes';
declare class AppsInstanceSizeEntity extends DigitaloceanEntityBase<AppsInstanceSize> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppsInstanceSizeEntity): AppsInstanceSizeEntity;
    load(this: any, reqmatch?: AppsInstanceSizeLoadMatch, ctrl?: Control): Promise<AppsInstanceSizeEntity>;
    list(this: any, reqmatch?: AppsInstanceSizeListMatch, ctrl?: Control): Promise<AppsInstanceSizeEntity[]>;
}
export { AppsInstanceSizeEntity };
