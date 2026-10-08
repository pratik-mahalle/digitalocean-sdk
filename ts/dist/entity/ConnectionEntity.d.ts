import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Connection, ConnectionLoadMatch, ConnectionListMatch, ConnectionCreateData, ConnectionRemoveMatch } from '../DigitaloceanTypes';
declare class ConnectionEntity extends DigitaloceanEntityBase<Connection> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ConnectionEntity): ConnectionEntity;
    load(this: any, reqmatch?: ConnectionLoadMatch, ctrl?: Control): Promise<ConnectionEntity>;
    list(this: any, reqmatch?: ConnectionListMatch, ctrl?: Control): Promise<ConnectionEntity[]>;
    create(this: any, reqdata?: ConnectionCreateData, ctrl?: Control): Promise<ConnectionEntity>;
    remove(this: any, reqmatch?: ConnectionRemoveMatch, ctrl?: Control): Promise<ConnectionEntity>;
}
export { ConnectionEntity };
