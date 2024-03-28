import { PartialType } from '@nestjs/mapped-types';
import { CreateTestNestRediDto } from './create-test-nest-redi.dto';

export class UpdateTestNestRediDto extends PartialType(CreateTestNestRediDto) {}
