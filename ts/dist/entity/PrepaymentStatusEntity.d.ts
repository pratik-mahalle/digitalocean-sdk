import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { PrepaymentStatus, PrepaymentStatusLoadMatch } from '../DigitaloceanTypes';
declare class PrepaymentStatusEntity extends DigitaloceanEntityBase<PrepaymentStatus> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: PrepaymentStatusEntity): PrepaymentStatusEntity;
    load(this: any, reqmatch?: PrepaymentStatusLoadMatch, ctrl?: Control): Promise<PrepaymentStatusEntity>;
}
export { PrepaymentStatusEntity };
