import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { SqlMode, SqlModeLoadMatch } from '../DigitaloceanTypes';
declare class SqlModeEntity extends DigitaloceanEntityBase<SqlMode> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SqlModeEntity): SqlModeEntity;
    load(this: any, reqmatch?: SqlModeLoadMatch, ctrl?: Control): Promise<SqlModeEntity>;
}
export { SqlModeEntity };
