import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteSimulationRunOutput, ApiDeleteSimulationRunOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteSimulationRunOutputEntity extends DigitaloceanEntityBase<ApiDeleteSimulationRunOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteSimulationRunOutputEntity): ApiDeleteSimulationRunOutputEntity;
    remove(this: any, reqmatch?: ApiDeleteSimulationRunOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteSimulationRunOutputEntity>;
}
export { ApiDeleteSimulationRunOutputEntity };
