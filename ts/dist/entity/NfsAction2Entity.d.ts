import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { NfsAction2, NfsAction2CreateData } from '../DigitaloceanTypes';
declare class NfsAction2Entity extends DigitaloceanEntityBase<NfsAction2> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: NfsAction2Entity): NfsAction2Entity;
    create(this: any, reqdata?: NfsAction2CreateData, ctrl?: Control): Promise<NfsAction2Entity>;
}
export { NfsAction2Entity };
