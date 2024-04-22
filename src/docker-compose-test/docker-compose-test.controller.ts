import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { DockerComposeTestService } from './docker-compose-test.service';
import { CreateDockerComposeTestDto } from './dto/create-docker-compose-test.dto';
import { UpdateDockerComposeTestDto } from './dto/update-docker-compose-test.dto';
import { RedisClientType } from 'redis';

@Controller('docker-compose-test')
export class DockerComposeTestController {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  constructor(
    private readonly dockerComposeTestService: DockerComposeTestService,
  ) {}

  @Post()
  create(@Body() createDockerComposeTestDto: CreateDockerComposeTestDto) {
    return this.dockerComposeTestService.create(createDockerComposeTestDto);
  }

  @Get()
  async findAll() {
    const keys = await this.redisClient.keys('*');
    console.log(keys);

    return this.dockerComposeTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dockerComposeTestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDockerComposeTestDto: UpdateDockerComposeTestDto,
  ) {
    return this.dockerComposeTestService.update(
      +id,
      updateDockerComposeTestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dockerComposeTestService.remove(+id);
  }
}
