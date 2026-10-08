import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { PrepaymentConfig, PrepaymentConfigLoadMatch } from '../DigitaloceanTypes';
declare class PrepaymentConfigEntity extends DigitaloceanEntityBase<PrepaymentConfig> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: PrepaymentConfigEntity): PrepaymentConfigEntity;
    load(this: any, reqmatch?: PrepaymentConfigLoadMatch, ctrl?: Control): Promise<PrepaymentConfigEntity>;
}
export { PrepaymentConfigEntity };
