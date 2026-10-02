import {
  IsNumber,
  IsString,
  IsLatitude,
  IsLongitude,
  Min,
  Max,
} from 'class-validator';

export class CreateReportDTO {
  @IsNumber()
  @Min(100000)
  @Max(1000000)
  price: number;

  @IsString()
  company: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2030)
  year: number;

  @IsNumber()
  @IsLatitude()
  lat: number;

  @IsNumber()
  @IsLongitude()
  lng: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
