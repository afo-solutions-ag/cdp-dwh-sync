import { Type } from 'class-transformer';
import { Equals, IsObject, IsUUID, ValidateNested } from 'class-validator';
import {
  GenericEventDataDto,
  GenericEventDto,
  GenericPayloadDto,
} from './generic.dtos';

export class SystemAdminDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  system_id: string;
}

class InsertSystemAdminEventDataDto extends GenericEventDataDto {
  @Equals(null)
  old: null;

  @IsObject()
  @ValidateNested()
  @Type(() => SystemAdminDto)
  new: SystemAdminDto;
}

class UpdateSystemAdminEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemAdminDto)
  old: SystemAdminDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SystemAdminDto)
  new: SystemAdminDto;
}

class DeleteSystemAdminEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemAdminDto)
  old: SystemAdminDto;

  @Equals(null)
  new: null;
}

export class InsertSystemAdminEventDto extends GenericEventDto {
  @Equals('INSERT')
  op: 'INSERT';

  @IsObject()
  @ValidateNested()
  @Type(() => InsertSystemAdminEventDataDto)
  data: InsertSystemAdminEventDataDto;
}

export class UpdateSystemAdminEventDto extends GenericEventDto {
  @Equals('UPDATE')
  op: 'UPDATE';

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateSystemAdminEventDataDto)
  data: UpdateSystemAdminEventDataDto;
}

export class DeleteSystemAdminEventDto extends GenericEventDto {
  @Equals('DELETE')
  op: 'DELETE';

  @IsObject()
  @ValidateNested()
  @Type(() => DeleteSystemAdminEventDataDto)
  data: DeleteSystemAdminEventDataDto;
}

export class InsertSystemAdminPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertSystemAdminEventDto)
  event: InsertSystemAdminEventDto;
}

export class UpdateSystemAdminPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateSystemAdminEventDto)
  event: UpdateSystemAdminEventDto;
}

export class DeleteSystemAdminPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteSystemAdminEventDto)
  event: DeleteSystemAdminEventDto;
}
