import { Injectable, BadRequestException, Delete, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marker } from './entities/marker.entity';
import { Model } from 'mongoose';
import { UpdateMarkerDto, CreateMarkerDto } from './dto';

@Injectable()
export class MarkerService {

  constructor(
    @InjectModel( Marker.name)
      private markerModel : Model<Marker>
    ){}

  async create(createMarkerDto : CreateMarkerDto){
    try{
      const { name, latitude, longitude, description, user_id} = createMarkerDto;
      //! not working with spread operator
      const newMarker = new this.markerModel({ name, description, latitude,longitude, user_id})
      await newMarker.save();

      const marker = newMarker.toJSON();

      return marker;
    } catch ( error ) {
      throw(error);
      // console.log( error.code );
    }

  }

  remove( id : string ){
    return this.markerModel.findByIdAndDelete(id);
  }

  update( id : string, updateMarkerDto : UpdateMarkerDto){
    console.log(id);
    return this.markerModel.findByIdAndUpdate(id,updateMarkerDto);
  }


}
