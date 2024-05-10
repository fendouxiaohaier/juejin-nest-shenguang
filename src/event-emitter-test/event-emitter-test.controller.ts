import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitterTestService } from './event-emitter-test.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('event-emitter-test')
export class EventEmitterTestController {
  constructor(
    private readonly eventEmitterTestService: EventEmitterTestService,
  ) {}

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    this.eventEmitterTestService.createUser(createUserDto);
  }
}
