import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteOpenAiapiKeyOutput, ApiDeleteOpenAiapiKeyOutputListMatch, ApiDeleteOpenAiapiKeyOutputCreateData, ApiDeleteOpenAiapiKeyOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteOpenAiapiKeyOutputEntity extends DigitaloceanEntityBase<ApiDeleteOpenAiapiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteOpenAiapiKeyOutputEntity): ApiDeleteOpenAiapiKeyOutputEntity;
    list(this: any, reqmatch?: ApiDeleteOpenAiapiKeyOutputListMatch, ctrl?: Control): Promise<ApiDeleteOpenAiapiKeyOutputEntity[]>;
    create(this: any, reqdata?: ApiDeleteOpenAiapiKeyOutputCreateData, ctrl?: Control): Promise<ApiDeleteOpenAiapiKeyOutputEntity>;
    remove(this: any, reqmatch?: ApiDeleteOpenAiapiKeyOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteOpenAiapiKeyOutputEntity>;
}
export { ApiDeleteOpenAiapiKeyOutputEntity };
