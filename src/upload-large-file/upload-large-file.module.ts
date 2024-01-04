import { Module } from '@nestjs/common';
import { UploadLargeFileService } from './upload-large-file.service';
import { UploadLargeFileController } from './upload-large-file.controller';

@Module({
  controllers: [UploadLargeFileController],
  providers: [UploadLargeFileService],
})
export class UploadLargeFileModule {}
