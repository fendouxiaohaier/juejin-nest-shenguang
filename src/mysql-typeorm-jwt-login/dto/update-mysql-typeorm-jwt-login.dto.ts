import { PartialType } from '@nestjs/mapped-types';
import { User } from './create-mysql-typeorm-jwt-login.dto';

export class UpdateMysqlTypeormJwtLoginDto extends PartialType(User) {}
