import { Body, Controller, Post } from '@nestjs/common';
import { MarkerService } from './marker.service';
import { CreateMarkerDto } from './dto/create-marker.dto';

@Controller('marker')
export class MarkerController {
  constructor( private readonly markerService : MarkerService){}

  @Post('/create')
  create(@Body() createMarkerDto : CreateMarkerDto){
    return this.markerService.create(createMarkerDto);
  }
}
