import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

import { storage } from './fileStorage';
import { FileSizeValidationPipePipe } from './file-size-validation-pipe.pipe';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  create(@Body() createUploadFileDto: CreateUploadFileDto) {
    return this.uploadFileService.create(createUploadFileDto);
  }

  @Get()
  findAll() {
    return this.uploadFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUploadFileDto: UpdateUploadFileDto,
  ) {
    return this.uploadFileService.update(+id, updateUploadFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadFileService.remove(+id);
  }

  // 单文件上传
  /**
   * FileSizeValidationPipePipe 对文件进行验证
   * @param file
   * @param body
   */
  @Post('uploadFile')
  @UseInterceptors(
    FileInterceptor('fileA', {
      dest: 'uploads',
    }),
  )
  uploadFile(
    @UploadedFile(FileSizeValidationPipePipe) file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('打印日志看看-file:', file);
    console.log('打印日志看看-body:', body);
  }

  // 多文件上传
  @Post('uploadFiles')
  @UseInterceptors(
    FilesInterceptor('filesA', 3, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    filesA: Express.Multer.File[],
    @Body() body,
  ) {
    console.log('打印日志看看-filesA:', filesA);
    console.log('打印日志看看-body:', body);
  }

  // 多文件多属性上传文件
  @Post('uploadFileFields')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'aaa', maxCount: 2 },
        { name: 'bbb', maxCount: 3 },
      ],
      {
        dest: 'uploads',
      },
    ),
  )
  uploadFileFields(
    @UploadedFiles()
    files: { aaa?: Express.Multer.File[]; bbb?: Express.Multer.File[] },
    @Body() body,
  ) {
    console.log('打印日志看看-files:', files);
    console.log('打印日志看看-body:', body);

    return 'success';
  }

  // 任意文件上传
  @Post('uploadAnyFile')
  @UseInterceptors(AnyFilesInterceptor({ storage }))
  uploadAnyFile(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
    console.log('打印日志看看-files:', files);
    console.log('打印日志看看-body:', body);
  }
}
