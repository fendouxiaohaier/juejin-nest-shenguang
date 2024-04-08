import { PartialType } from '@nestjs/mapped-types';
import { CreateAaaModuleDto } from './create-aaa-module.dto';

export class UpdateAaaModuleDto extends PartialType(CreateAaaModuleDto) {}
