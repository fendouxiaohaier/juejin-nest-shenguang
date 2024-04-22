import { Injectable } from '@nestjs/common';
import { CreateDockerComposeTestDto } from './dto/create-docker-compose-test.dto';
import { UpdateDockerComposeTestDto } from './dto/update-docker-compose-test.dto';

@Injectable()
export class DockerComposeTestService {
  create(createDockerComposeTestDto: CreateDockerComposeTestDto) {
    return 'This action adds a new dockerComposeTest';
  }

  findAll() {
    return `This action returns all dockerComposeTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dockerComposeTest`;
  }

  update(id: number, updateDockerComposeTestDto: UpdateDockerComposeTestDto) {
    return `This action updates a #${id} dockerComposeTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} dockerComposeTest`;
  }
}
