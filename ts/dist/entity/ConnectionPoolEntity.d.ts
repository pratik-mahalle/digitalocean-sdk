import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ConnectionPool, ConnectionPoolListMatch } from '../DigitaloceanTypes';
declare class ConnectionPoolEntity extends DigitaloceanEntityBase<ConnectionPool> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ConnectionPoolEntity): ConnectionPoolEntity;
    list(this: any, reqmatch?: ConnectionPoolListMatch, ctrl?: Control): Promise<ConnectionPoolEntity[]>;
}
export { ConnectionPoolEntity };
