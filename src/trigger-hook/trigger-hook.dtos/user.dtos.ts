import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  GenericDeleteEventDataDto,
  GenericDeleteEventDto,
  GenericInsertEventDataDto,
  GenericInsertEventDto,
  GenericPayloadDto,
  GenericUpdateEventDataDto,
  GenericUpdateEventDto,
} from './generic.dtos';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  first_name: string | null;

  @IsOptional()
  @IsString()
  last_name: string | null;
}

class InsertUserEventDataDto extends GenericInsertEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  new: UserDto;
}

class UpdateUserEventDataDto extends GenericUpdateEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  old: UserDto;

  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  new: UserDto;
}

class DeleteUserEventDataDto extends GenericDeleteEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  old: UserDto;
}

export class InsertUserEventDto extends GenericInsertEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertUserEventDataDto)
  data: InsertUserEventDataDto;
}

export class UpdateUserEventDto extends GenericUpdateEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserEventDataDto)
  data: UpdateUserEventDataDto;
}

export class DeleteUserEventDto extends GenericDeleteEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteUserEventDataDto)
  data: DeleteUserEventDataDto;
}

export class UserPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'op',
      subTypes: [
        { value: InsertUserEventDto, name: 'INSERT' },
        { value: UpdateUserEventDto, name: 'UPDATE' },
        { value: DeleteUserEventDto, name: 'DELETE' },
      ],
    },
  })
  event: InsertUserEventDto | UpdateUserEventDto | DeleteUserEventDto;
}
