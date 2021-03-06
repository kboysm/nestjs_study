import { IsString, IsNumber } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;
  @IsString()
  age: number;
  @IsString()
  breed: string;
}

export class UpdateCatDto {
  name?: string;
  age?: number;
  breed?: string;
}

export class ListAllEntities {
  name: string;
  age: number;
  breed: string;
  createdAt: Date;
  updatedAt: Date;
}
