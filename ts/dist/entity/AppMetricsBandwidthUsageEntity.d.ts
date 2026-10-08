import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppMetricsBandwidthUsage, AppMetricsBandwidthUsageListMatch, AppMetricsBandwidthUsageCreateData } from '../DigitaloceanTypes';
declare class AppMetricsBandwidthUsageEntity extends DigitaloceanEntityBase<AppMetricsBandwidthUsage> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppMetricsBandwidthUsageEntity): AppMetricsBandwidthUsageEntity;
    list(this: any, reqmatch?: AppMetricsBandwidthUsageListMatch, ctrl?: Control): Promise<AppMetricsBandwidthUsageEntity[]>;
    create(this: any, reqdata?: AppMetricsBandwidthUsageCreateData, ctrl?: Control): Promise<AppMetricsBandwidthUsageEntity>;
}
export { AppMetricsBandwidthUsageEntity };
