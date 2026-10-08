import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateOpenAiapiKeyOutput, ApiUpdateOpenAiapiKeyOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateOpenAiapiKeyOutputEntity extends DigitaloceanEntityBase<ApiUpdateOpenAiapiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateOpenAiapiKeyOutputEntity): ApiUpdateOpenAiapiKeyOutputEntity;
    update(this: any, reqdata?: ApiUpdateOpenAiapiKeyOutputUpdateData, ctrl?: Control): Promise<ApiUpdateOpenAiapiKeyOutputEntity>;
}
export { ApiUpdateOpenAiapiKeyOutputEntity };
