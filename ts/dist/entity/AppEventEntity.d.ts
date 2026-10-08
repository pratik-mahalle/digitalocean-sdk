import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppEvent, AppEventListMatch } from '../DigitaloceanTypes';
declare class AppEventEntity extends DigitaloceanEntityBase<AppEvent> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppEventEntity): AppEventEntity;
    list(this: any, reqmatch?: AppEventListMatch, ctrl?: Control): Promise<AppEventEntity[]>;
}
export { AppEventEntity };
