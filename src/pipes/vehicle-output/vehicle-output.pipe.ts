import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../../models';

@Pipe({
  name: 'vehicleOutput',
})
export class VehicleOutputPipe implements PipeTransform {
  transform(vehicle: Vehicle): string {
    return `${vehicle.brand} ${vehicle.model} (${vehicle.modelYear})`;
  }
}
