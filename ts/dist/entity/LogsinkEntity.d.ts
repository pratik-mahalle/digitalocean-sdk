import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Logsink, LogsinkLoadMatch } from '../DigitaloceanTypes';
declare class LogsinkEntity extends DigitaloceanEntityBase<Logsink> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: LogsinkEntity): LogsinkEntity;
    load(this: any, reqmatch?: LogsinkLoadMatch, ctrl?: Control): Promise<LogsinkEntity>;
}
export { LogsinkEntity };
