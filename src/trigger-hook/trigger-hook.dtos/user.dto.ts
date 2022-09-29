import { Type } from 'class-transformer';
import {
  Equals,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  GenericEventDataDto,
  GenericEventDto,
  GenericPayloadDto,
} from './generic.dto';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;
}

class InsertUserEventDataDto extends GenericEventDataDto {
  @Equals(null)
  old: null;

  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  new: UserDto;
}

class UpdateUserEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  old: UserDto;

  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  new: UserDto;
}

class DeleteUserEventDataDto extends GenericEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  old: UserDto;

  @Equals(null)
  new: null;
}

export class InsertUserEventDto extends GenericEventDto {
  @Equals('INSERT')
  op: 'INSERT';

  @IsObject()
  @ValidateNested()
  @Type(() => InsertUserEventDataDto)
  data: InsertUserEventDataDto;
}

export class UpdateUserEventDto extends GenericEventDto {
  @Equals('UPDATE')
  op: 'UPDATE';

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserEventDataDto)
  data: UpdateUserEventDataDto;
}

export class DeleteUserEventDto extends GenericEventDto {
  @Equals('DELETE')
  op: 'DELETE';

  @IsObject()
  @ValidateNested()
  @Type(() => DeleteUserEventDataDto)
  data: DeleteUserEventDataDto;
}

export class InsertUserPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertUserEventDto)
  event: InsertUserEventDto;
}

export class UpdateUserPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserEventDto)
  event: UpdateUserEventDto;
}

export class DeleteUserPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteUserEventDto)
  event: DeleteUserEventDto;
}
