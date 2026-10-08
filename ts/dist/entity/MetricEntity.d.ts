import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Metric, MetricLoadMatch } from '../DigitaloceanTypes';
declare class MetricEntity extends DigitaloceanEntityBase<Metric> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: MetricEntity): MetricEntity;
    load(this: any, reqmatch?: MetricLoadMatch, ctrl?: Control): Promise<MetricEntity>;
}
export { MetricEntity };
