import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { UploadLargeFileService } from './upload-large-file.service';
import { CreateUploadLargeFileDto } from './dto/create-upload-large-file.dto';
import { UpdateUploadLargeFileDto } from './dto/update-upload-large-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

import * as fs from 'fs';

@Controller('upload-large-file')
export class UploadLargeFileController {
  constructor(
    private readonly uploadLargeFileService: UploadLargeFileService,
  ) {}

  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;
    console.log('打印日志看看123-chunkDir:', chunkDir);

    return {
      name: chunkDir,
    };
    const files = fs.readdirSync(chunkDir);

    console.log('打印日志看看123-files:', files.length);

    let startPos = 0;
    files
      .sort((a: string, b: string) => {
        const indexA = parseInt(a.split('-').pop());
        const indexB = parseInt(b.split('-').pop());
        return indexA - indexB;
      })
      .map((file) => {
        const filePath = chunkDir + '/' + file;
        const stream = fs.createReadStream(filePath);
        stream.pipe(
          fs.createWriteStream('uploads/' + name, {
            start: startPos,
          }),
        );

        startPos += fs.statSync(filePath).size;
      });
  }

  @Post()
  create(@Body() createUploadLargeFileDto: CreateUploadLargeFileDto) {
    return this.uploadLargeFileService.create(createUploadLargeFileDto);
  }

  @Get()
  findAll() {
    return this.uploadLargeFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadLargeFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUploadLargeFileDto: UpdateUploadLargeFileDto,
  ) {
    return this.uploadLargeFileService.update(+id, updateUploadLargeFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadLargeFileService.remove(+id);
  }

  /**
   * @description 分片上传文件
   * @param files
   * @param body
   */
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { name: string },
  ) {
    console.log('body', body);
    console.log('files', files);

    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = 'uploads/chunks_' + fileName;

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    // 放到单独的文件目录里
    fs.cpSync(files[0].path, chunkDir + '/' + body.name);

    // 删除原文件
    if (fs.existsSync(files[0].path)) {
      fs.rmSync(files[0].path);
    }
  }
}
