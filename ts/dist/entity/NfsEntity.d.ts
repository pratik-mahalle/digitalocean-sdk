import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Nfs, NfsLoadMatch, NfsListMatch, NfsCreateData, NfsRemoveMatch } from '../DigitaloceanTypes';
declare class NfsEntity extends DigitaloceanEntityBase<Nfs> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: NfsEntity): NfsEntity;
    load(this: any, reqmatch?: NfsLoadMatch, ctrl?: Control): Promise<NfsEntity>;
    list(this: any, reqmatch?: NfsListMatch, ctrl?: Control): Promise<NfsEntity[]>;
    create(this: any, reqdata?: NfsCreateData, ctrl?: Control): Promise<NfsEntity>;
    remove(this: any, reqmatch?: NfsRemoveMatch, ctrl?: Control): Promise<NfsEntity>;
}
export { NfsEntity };
