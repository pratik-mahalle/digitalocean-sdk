import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppJobInvocation, AppJobInvocationLoadMatch, AppJobInvocationListMatch, AppJobInvocationCreateData } from '../DigitaloceanTypes';
declare class AppJobInvocationEntity extends DigitaloceanEntityBase<AppJobInvocation> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppJobInvocationEntity): AppJobInvocationEntity;
    load(this: any, reqmatch?: AppJobInvocationLoadMatch, ctrl?: Control): Promise<AppJobInvocationEntity>;
    list(this: any, reqmatch?: AppJobInvocationListMatch, ctrl?: Control): Promise<AppJobInvocationEntity[]>;
    create(this: any, reqdata?: AppJobInvocationCreateData, ctrl?: Control): Promise<AppJobInvocationEntity>;
}
export { AppJobInvocationEntity };
