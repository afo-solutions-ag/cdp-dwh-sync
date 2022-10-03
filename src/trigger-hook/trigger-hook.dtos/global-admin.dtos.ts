import { Type } from 'class-transformer';
import { Equals, IsObject, IsUUID, ValidateNested } from 'class-validator';
import {
  GenericEventDataDto,
  GenericEventDto,
  GenericPayloadDto,
} from './generic.dtos';

export class GlobalAdminDto {
  @IsUUID()
  user_id: string;
}

class InsertGlobalAdminEventDataDto extends GenericEventDataDto {
  @Equals(null)
  old: null;

  @IsObject()
  @ValidateNested()
  @Type(() => GlobalAdminDto)
  new: GlobalAdminDto;
}

class UpdateGlobalAdminEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => GlobalAdminDto)
  old: GlobalAdminDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GlobalAdminDto)
  new: GlobalAdminDto;
}

class DeleteGlobalAdminEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => GlobalAdminDto)
  old: GlobalAdminDto;

  @Equals(null)
  new: null;
}

export class InsertGlobalAdminEventDto extends GenericEventDto {
  @Equals('INSERT')
  op: 'INSERT';

  @IsObject()
  @ValidateNested()
  @Type(() => InsertGlobalAdminEventDataDto)
  data: InsertGlobalAdminEventDataDto;
}

export class UpdateGlobalAdminEventDto extends GenericEventDto {
  @Equals('UPDATE')
  op: 'UPDATE';

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateGlobalAdminEventDataDto)
  data: UpdateGlobalAdminEventDataDto;
}

export class DeleteGlobalAdminEventDto extends GenericEventDto {
  @Equals('DELETE')
  op: 'DELETE';

  @IsObject()
  @ValidateNested()
  @Type(() => DeleteGlobalAdminEventDataDto)
  data: DeleteGlobalAdminEventDataDto;
}

export class InsertGlobalAdminPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertGlobalAdminEventDto)
  event: InsertGlobalAdminEventDto;
}

export class UpdateGlobalAdminPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateGlobalAdminEventDto)
  event: UpdateGlobalAdminEventDto;
}

export class DeleteGlobalAdminPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteGlobalAdminEventDto)
  event: DeleteGlobalAdminEventDto;
}
