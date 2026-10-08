import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { N1ClickApplication, N1ClickApplicationCreateData } from '../DigitaloceanTypes';
declare class N1ClickApplicationEntity extends DigitaloceanEntityBase<N1ClickApplication> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: N1ClickApplicationEntity): N1ClickApplicationEntity;
    create(this: any, reqdata?: N1ClickApplicationCreateData, ctrl?: Control): Promise<N1ClickApplicationEntity>;
}
export { N1ClickApplicationEntity };
