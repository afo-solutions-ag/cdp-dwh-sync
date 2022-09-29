import { Type } from 'class-transformer';
import {
  Equals,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { GenericEventDataDto, GenericEventDto, GenericPayloadDto } from '.';

export class SystemDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}

class InsertSystemEventDataDto extends GenericEventDataDto {
  @Equals(null)
  old: null;

  @IsObject()
  @ValidateNested()
  @Type(() => SystemDto)
  new: SystemDto;
}

class UpdateSystemEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemDto)
  old: SystemDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SystemDto)
  new: SystemDto;
}

class DeleteSystemEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemDto)
  old: SystemDto;

  @Equals(null)
  new: null;
}

export class InsertSystemEventDto extends GenericEventDto {
  @Equals('INSERT')
  op: 'INSERT';

  @IsObject()
  @ValidateNested()
  @Type(() => InsertSystemEventDataDto)
  data: InsertSystemEventDataDto;
}

export class UpdateSystemEventDto extends GenericEventDto {
  @Equals('UPDATE')
  op: 'UPDATE';

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateSystemEventDataDto)
  data: UpdateSystemEventDataDto;
}

export class DeleteSystemEventDto extends GenericEventDto {
  @Equals('DELETE')
  op: 'DELETE';

  @IsObject()
  @ValidateNested()
  @Type(() => DeleteSystemEventDataDto)
  data: DeleteSystemEventDataDto;
}

export class InsertSystemPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertSystemEventDto)
  event: InsertSystemEventDto;
}

export class UpdateSystemPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateSystemEventDto)
  event: UpdateSystemEventDto;
}

export class DeleteSystemPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteSystemEventDto)
  event: DeleteSystemEventDto;
}
