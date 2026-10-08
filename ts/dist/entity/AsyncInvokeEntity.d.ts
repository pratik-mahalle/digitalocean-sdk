import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AsyncInvoke, AsyncInvokeCreateData } from '../DigitaloceanTypes';
declare class AsyncInvokeEntity extends DigitaloceanEntityBase<AsyncInvoke> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AsyncInvokeEntity): AsyncInvokeEntity;
    create(this: any, reqdata?: AsyncInvokeCreateData, ctrl?: Control): Promise<AsyncInvokeEntity>;
}
export { AsyncInvokeEntity };
