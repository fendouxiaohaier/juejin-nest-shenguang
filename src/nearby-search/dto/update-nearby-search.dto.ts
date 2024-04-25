import { PartialType } from '@nestjs/mapped-types';
import { CreateNearbySearchDto } from './create-nearby-search.dto';

export class UpdateNearbySearchDto extends PartialType(CreateNearbySearchDto) {}
