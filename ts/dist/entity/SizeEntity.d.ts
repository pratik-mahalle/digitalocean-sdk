import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Size, SizeListMatch } from '../DigitaloceanTypes';
declare class SizeEntity extends DigitaloceanEntityBase<Size> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SizeEntity): SizeEntity;
    list(this: any, reqmatch?: SizeListMatch, ctrl?: Control): Promise<SizeEntity[]>;
}
export { SizeEntity };
