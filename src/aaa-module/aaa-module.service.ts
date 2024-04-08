import { Injectable } from '@nestjs/common';
import { CreateAaaModuleDto } from './dto/create-aaa-module.dto';
import { UpdateAaaModuleDto } from './dto/update-aaa-module.dto';

@Injectable()
export class AaaModuleService {
  create(createAaaModuleDto: CreateAaaModuleDto) {
    return 'This action adds a new aaaModule';
  }

  findAll() {
    return `This action returns all aaaModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aaaModule`;
  }

  update(id: number, updateAaaModuleDto: UpdateAaaModuleDto) {
    return `This action updates a #${id} aaaModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} aaaModule`;
  }
}
