import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { NearbySearchService } from './nearby-search.service';
import { CreateNearbySearchDto } from './dto/create-nearby-search.dto';
import { UpdateNearbySearchDto } from './dto/update-nearby-search.dto';
import { RedisService } from 'src/nearby-search/redis/redis.service';

@Controller('nearby-search')
export class NearbySearchController {
  @Inject(RedisService)
  private redisService: RedisService;

  constructor(private readonly nearbySearchService: NearbySearchService) {}

  @Get('nearbySearch')
  async nearbySearch(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('radius') radius: number,
  ) {
    if (!longitude || !latitude) {
      throw new BadRequestException('缺少位置信息');
    }
    if (!radius) {
      throw new BadRequestException('缺少搜索半径');
    }

    return this.redisService.geoSearch(
      'positions',
      [longitude, latitude],
      radius,
    );
  }

  @Get('allPos')
  async allPos() {
    return this.redisService.geoList('positions');
  }

  @Get('pos')
  async pos(@Query('name') name: string) {
    return this.redisService.geoPos('positions', name);
  }

  @Post('addPos')
  async addPos(
    @Query('name') posName: string,
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
  ) {
    if (!posName || !longitude || !latitude) {
      throw new BadRequestException('位置信息不全');
    }

    try {
      await this.redisService.geoAdd('positions', posName, [
        longitude,
        latitude,
      ]);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return {
      message: '添加成功',
      statusCode: 200,
    };
  }

  @Post()
  create(@Body() createNearbySearchDto: CreateNearbySearchDto) {
    return this.nearbySearchService.create(createNearbySearchDto);
  }

  @Get()
  findAll() {
    return this.nearbySearchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nearbySearchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNearbySearchDto: UpdateNearbySearchDto,
  ) {
    return this.nearbySearchService.update(+id, updateNearbySearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nearbySearchService.remove(+id);
  }
}
