import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetSimulationRunOutput, ApiGetSimulationRunOutputLoadMatch, ApiGetSimulationRunOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiGetSimulationRunOutputEntity extends DigitaloceanEntityBase<ApiGetSimulationRunOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetSimulationRunOutputEntity): ApiGetSimulationRunOutputEntity;
    load(this: any, reqmatch?: ApiGetSimulationRunOutputLoadMatch, ctrl?: Control): Promise<ApiGetSimulationRunOutputEntity>;
    update(this: any, reqdata?: ApiGetSimulationRunOutputUpdateData, ctrl?: Control): Promise<ApiGetSimulationRunOutputEntity>;
}
export { ApiGetSimulationRunOutputEntity };
