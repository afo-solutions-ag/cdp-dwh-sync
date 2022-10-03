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
} from './generic.dtos';

export class RedshiftConfigurationDto {
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

class InsertRedshiftConfigurationEventDataDto extends GenericEventDataDto {
  @Equals(null)
  old: null;

  @IsObject()
  @ValidateNested()
  @Type(() => RedshiftConfigurationDto)
  new: RedshiftConfigurationDto;
}

class UpdateRedshiftConfigurationEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => RedshiftConfigurationDto)
  old: RedshiftConfigurationDto;

  @IsObject()
  @ValidateNested()
  @Type(() => RedshiftConfigurationDto)
  new: RedshiftConfigurationDto;
}

class DeleteRedshiftConfigurationEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => RedshiftConfigurationDto)
  old: RedshiftConfigurationDto;

  @Equals(null)
  new: null;
}

export class InsertRedshiftConfigurationEventDto extends GenericEventDto {
  @Equals('INSERT')
  op: 'INSERT';

  @IsObject()
  @ValidateNested()
  @Type(() => InsertRedshiftConfigurationEventDataDto)
  data: InsertRedshiftConfigurationEventDataDto;
}

export class UpdateRedshiftConfigurationEventDto extends GenericEventDto {
  @Equals('UPDATE')
  op: 'UPDATE';

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateRedshiftConfigurationEventDataDto)
  data: UpdateRedshiftConfigurationEventDataDto;
}

export class DeleteRedshiftConfigurationEventDto extends GenericEventDto {
  @Equals('DELETE')
  op: 'DELETE';

  @IsObject()
  @ValidateNested()
  @Type(() => DeleteRedshiftConfigurationEventDataDto)
  data: DeleteRedshiftConfigurationEventDataDto;
}

export class InsertRedshiftConfigurationPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertRedshiftConfigurationEventDto)
  event: InsertRedshiftConfigurationEventDto;
}

export class UpdateRedshiftConfigurationPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateRedshiftConfigurationEventDto)
  event: UpdateRedshiftConfigurationEventDto;
}

export class DeleteRedshiftConfigurationPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteRedshiftConfigurationEventDto)
  event: DeleteRedshiftConfigurationEventDto;
}
