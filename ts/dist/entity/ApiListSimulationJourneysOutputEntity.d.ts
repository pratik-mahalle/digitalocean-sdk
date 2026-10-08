import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListSimulationJourneysOutput, ApiListSimulationJourneysOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListSimulationJourneysOutputEntity extends DigitaloceanEntityBase<ApiListSimulationJourneysOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListSimulationJourneysOutputEntity): ApiListSimulationJourneysOutputEntity;
    list(this: any, reqmatch?: ApiListSimulationJourneysOutputListMatch, ctrl?: Control): Promise<ApiListSimulationJourneysOutputEntity[]>;
}
export { ApiListSimulationJourneysOutputEntity };
