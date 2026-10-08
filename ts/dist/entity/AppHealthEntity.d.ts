import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppHealth, AppHealthLoadMatch } from '../DigitaloceanTypes';
declare class AppHealthEntity extends DigitaloceanEntityBase<AppHealth> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppHealthEntity): AppHealthEntity;
    load(this: any, reqmatch?: AppHealthLoadMatch, ctrl?: Control): Promise<AppHealthEntity>;
}
export { AppHealthEntity };
