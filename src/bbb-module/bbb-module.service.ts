import { Injectable } from '@nestjs/common';
import { CreateBbbModuleDto } from './dto/create-bbb-module.dto';
import { UpdateBbbModuleDto } from './dto/update-bbb-module.dto';

@Injectable()
export class BbbModuleService {
  create(createBbbModuleDto: CreateBbbModuleDto) {
    return 'This action adds a new bbbModule';
  }

  findAll() {
    return `This action returns all bbbModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bbbModule`;
  }

  update(id: number, updateBbbModuleDto: UpdateBbbModuleDto) {
    return `This action updates a #${id} bbbModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} bbbModule`;
  }
}
