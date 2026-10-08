import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetSimulationJourneyTrajectoryUrlOutput, ApiGetSimulationJourneyTrajectoryUrlOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetSimulationJourneyTrajectoryUrlOutputEntity extends DigitaloceanEntityBase<ApiGetSimulationJourneyTrajectoryUrlOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetSimulationJourneyTrajectoryUrlOutputEntity): ApiGetSimulationJourneyTrajectoryUrlOutputEntity;
    load(this: any, reqmatch?: ApiGetSimulationJourneyTrajectoryUrlOutputLoadMatch, ctrl?: Control): Promise<ApiGetSimulationJourneyTrajectoryUrlOutputEntity>;
}
export { ApiGetSimulationJourneyTrajectoryUrlOutputEntity };
