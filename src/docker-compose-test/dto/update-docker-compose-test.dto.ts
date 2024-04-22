import { PartialType } from '@nestjs/mapped-types';
import { CreateDockerComposeTestDto } from './create-docker-compose-test.dto';

export class UpdateDockerComposeTestDto extends PartialType(CreateDockerComposeTestDto) {}
