import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppsGetLog, AppsGetLogListMatch } from '../DigitaloceanTypes';
declare class AppsGetLogEntity extends DigitaloceanEntityBase<AppsGetLog> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppsGetLogEntity): AppsGetLogEntity;
    list(this: any, reqmatch?: AppsGetLogListMatch, ctrl?: Control): Promise<AppsGetLogEntity[]>;
}
export { AppsGetLogEntity };
