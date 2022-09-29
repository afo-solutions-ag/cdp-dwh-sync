import { Type } from 'class-transformer';
import {
  Equals,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { GenericEventDataDto, GenericEventDto } from './generic.dto';

export class UnitDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsUUID()
  system_id: string;
}

class InsertUnitEventDataDto extends GenericEventDataDto {
  @Equals(null)
  old: null;

  @IsObject()
  @ValidateNested()
  @Type(() => UnitDto)
  new: UnitDto;
}

class UpdateUnitEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitDto)
  old: UnitDto;

  @IsObject()
  @ValidateNested()
  @Type(() => UnitDto)
  new: UnitDto;
}

class DeleteUnitEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitDto)
  old: UnitDto;

  @Equals(null)
  new: null;
}

export class InsertUnitEventDto extends GenericEventDto {
  @Equals('INSERT')
  op: 'INSERT';

  @IsObject()
  @ValidateNested()
  @Type(() => InsertUnitEventDataDto)
  data: InsertUnitEventDataDto;
}

export class UpdateUnitEventDto extends GenericEventDto {
  @Equals('UPDATE')
  op: 'UPDATE';

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUnitEventDataDto)
  data: UpdateUnitEventDataDto;
}

export class DeleteUnitEventDto extends GenericEventDto {
  @Equals('DELETE')
  op: 'DELETE';

  @IsObject()
  @ValidateNested()
  @Type(() => DeleteUnitEventDataDto)
  data: DeleteUnitEventDataDto;
}

export class InsertUnitPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertUnitEventDto)
  event: InsertUnitEventDto;
}

export class UpdateUnitPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUnitEventDto)
  event: UpdateUnitEventDto;
}

export class DeleteUnitPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteUnitEventDto)
  event: DeleteUnitEventDto;
}
