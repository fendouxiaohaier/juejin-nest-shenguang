import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessTokenAndRefreshTokenDto } from './create-access-token-and-refresh-token.dto';

export class UpdateAccessTokenAndRefreshTokenDto extends PartialType(CreateAccessTokenAndRefreshTokenDto) {}
