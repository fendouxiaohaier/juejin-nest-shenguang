import { PartialType } from '@nestjs/mapped-types';
import { CreateTestNestTypeormDto } from './create-test-nest-typeorm.dto';

export class UpdateTestNestTypeormDto extends PartialType(
  CreateTestNestTypeormDto,
) {}
