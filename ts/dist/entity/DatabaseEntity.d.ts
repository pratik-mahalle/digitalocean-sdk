import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Database, DatabaseLoadMatch, DatabaseListMatch, DatabaseCreateData, DatabaseUpdateData, DatabasePatchData, DatabaseRemoveMatch } from '../DigitaloceanTypes';
declare class DatabaseEntity extends DigitaloceanEntityBase<Database> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DatabaseEntity): DatabaseEntity;
    load(this: any, reqmatch?: DatabaseLoadMatch, ctrl?: Control): Promise<DatabaseEntity>;
    list(this: any, reqmatch?: DatabaseListMatch, ctrl?: Control): Promise<DatabaseEntity[]>;
    create(this: any, reqdata?: DatabaseCreateData, ctrl?: Control): Promise<DatabaseEntity>;
    update(this: any, reqdata?: DatabaseUpdateData, ctrl?: Control): Promise<DatabaseEntity>;
    patch(this: any, reqdata?: DatabasePatchData, ctrl?: Control): Promise<DatabaseEntity>;
    remove(this: any, reqmatch?: DatabaseRemoveMatch, ctrl?: Control): Promise<DatabaseEntity>;
}
export { DatabaseEntity };
