import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { OutputView, OutputViewLoadMatch, OutputViewListMatch, OutputViewCreateData, OutputViewRemoveMatch } from '../DigitaloceanTypes';
declare class OutputViewEntity extends DigitaloceanEntityBase<OutputView> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: OutputViewEntity): OutputViewEntity;
    load(this: any, reqmatch?: OutputViewLoadMatch, ctrl?: Control): Promise<OutputViewEntity>;
    list(this: any, reqmatch?: OutputViewListMatch, ctrl?: Control): Promise<OutputViewEntity[]>;
    create(this: any, reqdata?: OutputViewCreateData, ctrl?: Control): Promise<OutputViewEntity>;
    remove(this: any, reqmatch?: OutputViewRemoveMatch, ctrl?: Control): Promise<OutputViewEntity>;
}
export { OutputViewEntity };
