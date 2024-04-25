import { Injectable } from '@nestjs/common';
import { CreateNearbySearchDto } from './dto/create-nearby-search.dto';
import { UpdateNearbySearchDto } from './dto/update-nearby-search.dto';

@Injectable()
export class NearbySearchService {
  create(createNearbySearchDto: CreateNearbySearchDto) {
    return 'This action adds a new nearbySearch';
  }

  findAll() {
    return `This action returns all nearbySearch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nearbySearch`;
  }

  update(id: number, updateNearbySearchDto: UpdateNearbySearchDto) {
    return `This action updates a #${id} nearbySearch`;
  }

  remove(id: number) {
    return `This action removes a #${id} nearbySearch`;
  }
}
