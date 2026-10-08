import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateSimulationRunOutput, ApiUpdateSimulationRunOutputListMatch, ApiUpdateSimulationRunOutputCreateData, ApiUpdateSimulationRunOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateSimulationRunOutputEntity extends DigitaloceanEntityBase<ApiUpdateSimulationRunOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateSimulationRunOutputEntity): ApiUpdateSimulationRunOutputEntity;
    list(this: any, reqmatch?: ApiUpdateSimulationRunOutputListMatch, ctrl?: Control): Promise<ApiUpdateSimulationRunOutputEntity[]>;
    create(this: any, reqdata?: ApiUpdateSimulationRunOutputCreateData, ctrl?: Control): Promise<ApiUpdateSimulationRunOutputEntity>;
    update(this: any, reqdata?: ApiUpdateSimulationRunOutputUpdateData, ctrl?: Control): Promise<ApiUpdateSimulationRunOutputEntity>;
}
export { ApiUpdateSimulationRunOutputEntity };
