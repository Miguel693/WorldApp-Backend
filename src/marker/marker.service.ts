import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Marker } from './entities/marker.entity';
import { Model } from 'mongoose';

@Injectable()
export class MarkerService {

  constructor(
    @InjectModel( Marker.name)
      private markerModel : Model<Marker>
    ){}

  async create(createMarkerDto : CreateMarkerDto){
    try{
      const { name, latitude, longitude, description} = createMarkerDto;
      //! not working with spread operator
      const newMarker = new this.markerModel({ name: name, description: description, latitude: latitude, longitude: longitude})
      await newMarker.save();

      const marker = newMarker.toJSON();

      return marker;
    } catch ( error ) {
      throw(error);
      // console.log( error.code );
    }

  }
}
