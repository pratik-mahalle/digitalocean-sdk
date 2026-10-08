import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { DomainRecord, DomainRecordLoadMatch, DomainRecordListMatch, DomainRecordCreateData, DomainRecordUpdateData, DomainRecordPatchData, DomainRecordRemoveMatch } from '../DigitaloceanTypes';
declare class DomainRecordEntity extends DigitaloceanEntityBase<DomainRecord> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DomainRecordEntity): DomainRecordEntity;
    load(this: any, reqmatch?: DomainRecordLoadMatch, ctrl?: Control): Promise<DomainRecordEntity>;
    list(this: any, reqmatch?: DomainRecordListMatch, ctrl?: Control): Promise<DomainRecordEntity[]>;
    create(this: any, reqdata?: DomainRecordCreateData, ctrl?: Control): Promise<DomainRecordEntity>;
    update(this: any, reqdata?: DomainRecordUpdateData, ctrl?: Control): Promise<DomainRecordEntity>;
    patch(this: any, reqdata?: DomainRecordPatchData, ctrl?: Control): Promise<DomainRecordEntity>;
    remove(this: any, reqmatch?: DomainRecordRemoveMatch, ctrl?: Control): Promise<DomainRecordEntity>;
}
export { DomainRecordEntity };
