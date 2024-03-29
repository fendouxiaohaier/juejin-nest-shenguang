import { PartialType } from '@nestjs/mapped-types';
import { CreateTestNestSessionCookitJwtDto } from './create-test-nest-session-cookit-jwt.dto';

export class UpdateTestNestSessionCookitJwtDto extends PartialType(CreateTestNestSessionCookitJwtDto) {}
