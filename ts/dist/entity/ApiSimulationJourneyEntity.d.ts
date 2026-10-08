import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiSimulationJourney, ApiSimulationJourneyLoadMatch } from '../DigitaloceanTypes';
declare class ApiSimulationJourneyEntity extends DigitaloceanEntityBase<ApiSimulationJourney> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiSimulationJourneyEntity): ApiSimulationJourneyEntity;
    load(this: any, reqmatch?: ApiSimulationJourneyLoadMatch, ctrl?: Control): Promise<ApiSimulationJourneyEntity>;
}
export { ApiSimulationJourneyEntity };
