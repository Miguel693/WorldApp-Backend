import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { MarkerService } from './marker.service';
import { UpdateMarkerDto,
         CreateMarkerDto } from './dto';

@Controller('marker')
export class MarkerController {
  constructor( private readonly markerService : MarkerService){}

  @Post('/create')
  create(@Body() createMarkerDto : CreateMarkerDto){
    return this.markerService.create(createMarkerDto);
  }

  @Delete('del/:id')
  remove(@Param('id') id: string) {
    // console.log(id);
    return this.markerService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') _id : string, @Body() updateMarkerDto : UpdateMarkerDto){
    return this.markerService.update(_id,updateMarkerDto);
  }
}
