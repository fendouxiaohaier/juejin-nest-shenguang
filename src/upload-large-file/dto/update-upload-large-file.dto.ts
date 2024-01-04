import { PartialType } from '@nestjs/mapped-types';
import { CreateUploadLargeFileDto } from './create-upload-large-file.dto';

export class UpdateUploadLargeFileDto extends PartialType(CreateUploadLargeFileDto) {}
