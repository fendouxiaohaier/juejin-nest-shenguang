import { Injectable } from '@nestjs/common';
import { CreateUploadLargeFileDto } from './dto/create-upload-large-file.dto';
import { UpdateUploadLargeFileDto } from './dto/update-upload-large-file.dto';

@Injectable()
export class UploadLargeFileService {
  create(createUploadLargeFileDto: CreateUploadLargeFileDto) {
    return 'This action adds a new uploadLargeFile';
  }

  findAll() {
    return `This action returns all uploadLargeFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadLargeFile`;
  }

  update(id: number, updateUploadLargeFileDto: UpdateUploadLargeFileDto) {
    return `This action updates a #${id} uploadLargeFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadLargeFile`;
  }
}
