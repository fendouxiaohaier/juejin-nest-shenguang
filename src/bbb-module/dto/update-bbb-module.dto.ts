import { PartialType } from '@nestjs/mapped-types';
import { CreateBbbModuleDto } from './create-bbb-module.dto';

export class UpdateBbbModuleDto extends PartialType(CreateBbbModuleDto) {}
