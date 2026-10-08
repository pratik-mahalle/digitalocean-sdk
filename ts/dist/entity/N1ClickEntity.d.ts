import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { N1Click, N1ClickListMatch } from '../DigitaloceanTypes';
declare class N1ClickEntity extends DigitaloceanEntityBase<N1Click> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: N1ClickEntity): N1ClickEntity;
    list(this: any, reqmatch?: N1ClickListMatch, ctrl?: Control): Promise<N1ClickEntity[]>;
}
export { N1ClickEntity };
