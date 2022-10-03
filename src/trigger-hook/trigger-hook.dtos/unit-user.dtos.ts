import { Type } from 'class-transformer';
import { Equals, IsObject, IsUUID, ValidateNested } from 'class-validator';
import {
  GenericEventDataDto,
  GenericEventDto,
  GenericPayloadDto,
} from './generic.dtos';

export class UnitUserDto {
  @IsUUID()
  unit_id: string;

  @IsUUID()
  user_id: string;
}

class InsertUnitUserEventDataDto extends GenericEventDataDto {
  @Equals(null)
  old: null;

  @IsObject()
  @ValidateNested()
  @Type(() => UnitUserDto)
  new: UnitUserDto;
}

class UpdateUnitUserEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitUserDto)
  old: UnitUserDto;

  @IsObject()
  @ValidateNested()
  @Type(() => UnitUserDto)
  new: UnitUserDto;
}

class DeleteUnitUserEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitUserDto)
  old: UnitUserDto;

  @Equals(null)
  new: null;
}

export class InsertUnitUserEventDto extends GenericEventDto {
  @Equals('INSERT')
  op: 'INSERT';

  @IsObject()
  @ValidateNested()
  @Type(() => InsertUnitUserEventDataDto)
  data: InsertUnitUserEventDataDto;
}

export class UpdateUnitUserEventDto extends GenericEventDto {
  @Equals('UPDATE')
  op: 'UPDATE';

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUnitUserEventDataDto)
  data: UpdateUnitUserEventDataDto;
}

export class DeleteUnitUserEventDto extends GenericEventDto {
  @Equals('DELETE')
  op: 'DELETE';

  @IsObject()
  @ValidateNested()
  @Type(() => DeleteUnitUserEventDataDto)
  data: DeleteUnitUserEventDataDto;
}

export class InsertUnitUserPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertUnitUserEventDto)
  event: InsertUnitUserEventDto;
}

export class UpdateUnitUserPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUnitUserEventDto)
  event: UpdateUnitUserEventDto;
}

export class DeleteUnitUserPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteUnitUserEventDto)
  event: DeleteUnitUserEventDto;
}
