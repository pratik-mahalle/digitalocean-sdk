import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { OnlineMigration, OnlineMigrationLoadMatch, OnlineMigrationUpdateData } from '../DigitaloceanTypes';
declare class OnlineMigrationEntity extends DigitaloceanEntityBase<OnlineMigration> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: OnlineMigrationEntity): OnlineMigrationEntity;
    load(this: any, reqmatch?: OnlineMigrationLoadMatch, ctrl?: Control): Promise<OnlineMigrationEntity>;
    update(this: any, reqdata?: OnlineMigrationUpdateData, ctrl?: Control): Promise<OnlineMigrationEntity>;
}
export { OnlineMigrationEntity };
