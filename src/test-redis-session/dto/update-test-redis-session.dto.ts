import { PartialType } from '@nestjs/mapped-types';
import { CreateTestRedisSessionDto } from './create-test-redis-session.dto';

export class UpdateTestRedisSessionDto extends PartialType(CreateTestRedisSessionDto) {}
