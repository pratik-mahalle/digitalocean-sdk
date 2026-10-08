import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppsGetExec, AppsGetExecLoadMatch } from '../DigitaloceanTypes';
declare class AppsGetExecEntity extends DigitaloceanEntityBase<AppsGetExec> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppsGetExecEntity): AppsGetExecEntity;
    load(this: any, reqmatch?: AppsGetExecLoadMatch, ctrl?: Control): Promise<AppsGetExecEntity>;
}
export { AppsGetExecEntity };
