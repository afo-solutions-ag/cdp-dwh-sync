import { Type } from 'class-transformer';
import {
  Equals,
  IsObject,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  GenericEventDataDto,
  GenericEventDto,
  GenericPayloadDto,
} from './generic.dto';

export class DWHConnectionDto {
  @IsUUID()
  id: string;

  @IsUrl()
  host: string;

  @IsString()
  database: string;

  @IsString()
  user: string;

  @IsUUID()
  system_id: string;
}

class InsertDWHConnectionEventDataDto extends GenericEventDataDto {
  @Equals(null)
  old: null;

  @IsObject()
  @ValidateNested()
  @Type(() => DWHConnectionDto)
  new: DWHConnectionDto;
}

class UpdateDWHConnectionEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DWHConnectionDto)
  old: DWHConnectionDto;

  @IsObject()
  @ValidateNested()
  @Type(() => DWHConnectionDto)
  new: DWHConnectionDto;
}

class DeleteDWHConnectionEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DWHConnectionDto)
  old: DWHConnectionDto;

  @Equals(null)
  new: null;
}

export class InsertDWHConnectionEventDto extends GenericEventDto {
  @Equals('INSERT')
  op: 'INSERT';

  @IsObject()
  @ValidateNested()
  @Type(() => InsertDWHConnectionEventDataDto)
  data: InsertDWHConnectionEventDataDto;
}

export class UpdateDWHConnectionEventDto extends GenericEventDto {
  @Equals('UPDATE')
  op: 'UPDATE';

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateDWHConnectionEventDataDto)
  data: UpdateDWHConnectionEventDataDto;
}

export class DeleteDWHConnectionEventDto extends GenericEventDto {
  @Equals('DELETE')
  op: 'DELETE';

  @IsObject()
  @ValidateNested()
  @Type(() => DeleteDWHConnectionEventDataDto)
  data: DeleteDWHConnectionEventDataDto;
}

export class InsertDWHConnectionPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertDWHConnectionEventDto)
  event: InsertDWHConnectionEventDto;
}

export class UpdateDWHConnectionPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateDWHConnectionEventDto)
  event: UpdateDWHConnectionEventDto;
}

export class DeleteDWHConnectionPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteDWHConnectionEventDto)
  event: DeleteDWHConnectionEventDto;
}
