import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiCreateDataSourceFileUploadPresignedUrlsOutput, ApiCreateDataSourceFileUploadPresignedUrlsOutputCreateData } from '../DigitaloceanTypes';
declare class ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity extends DigitaloceanEntityBase<ApiCreateDataSourceFileUploadPresignedUrlsOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity): ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity;
    create(this: any, reqdata?: ApiCreateDataSourceFileUploadPresignedUrlsOutputCreateData, ctrl?: Control): Promise<ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity>;
}
export { ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity };
