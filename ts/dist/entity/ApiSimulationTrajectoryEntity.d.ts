import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiSimulationTrajectory, ApiSimulationTrajectoryLoadMatch } from '../DigitaloceanTypes';
declare class ApiSimulationTrajectoryEntity extends DigitaloceanEntityBase<ApiSimulationTrajectory> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiSimulationTrajectoryEntity): ApiSimulationTrajectoryEntity;
    load(this: any, reqmatch?: ApiSimulationTrajectoryLoadMatch, ctrl?: Control): Promise<ApiSimulationTrajectoryEntity>;
}
export { ApiSimulationTrajectoryEntity };
