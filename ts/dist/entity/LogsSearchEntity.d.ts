import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { LogsSearch, LogsSearchCreateData } from '../DigitaloceanTypes';
declare class LogsSearchEntity extends DigitaloceanEntityBase<LogsSearch> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: LogsSearchEntity): LogsSearchEntity;
    create(this: any, reqdata?: LogsSearchCreateData, ctrl?: Control): Promise<LogsSearchEntity>;
}
export { LogsSearchEntity };
