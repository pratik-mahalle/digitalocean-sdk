import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { InvoiceSummary, InvoiceSummaryLoadMatch } from '../DigitaloceanTypes';
declare class InvoiceSummaryEntity extends DigitaloceanEntityBase<InvoiceSummary> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: InvoiceSummaryEntity): InvoiceSummaryEntity;
    load(this: any, reqmatch?: InvoiceSummaryLoadMatch, ctrl?: Control): Promise<InvoiceSummaryEntity>;
}
export { InvoiceSummaryEntity };
