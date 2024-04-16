import { PartialType } from '@nestjs/mapped-types';
import { CreateTestEnvConfigDto } from './create-test-env-config.dto';

export class UpdateTestEnvConfigDto extends PartialType(CreateTestEnvConfigDto) {}
