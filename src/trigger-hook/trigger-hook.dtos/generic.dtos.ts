import { Type } from 'class-transformer';
import {
  Equals,
  IsDateString,
  IsEmpty,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class TableDto {
  @IsString()
  schema: string;

  @IsString()
  name: string;
}
export class GenericInsertEventDataDto {
  @IsEmpty()
  old: null;

  @IsObject()
  new: object;
}

export class GenericUpdateEventDataDto {
  @IsObject()
  old: object;

  @IsObject()
  new: object;
}

export class GenericDeleteEventDataDto {
  @IsObject()
  old: object;

  @IsEmpty()
  new: null;
}

export class GenericInsertEventDto {
  @Equals('INSERT')
  op: 'INSERT';

  @IsObject()
  session_variables: object;

  @IsObject()
  @ValidateNested()
  @Type(() => GenericInsertEventDataDto)
  data: GenericInsertEventDataDto;
}

export class GenericUpdateEventDto {
  @Equals('UPDATE')
  op: 'UPDATE';

  @IsObject()
  session_variables: object;

  @IsObject()
  @ValidateNested()
  @Type(() => GenericUpdateEventDataDto)
  data: GenericUpdateEventDataDto;
}

export class GenericDeleteEventDto {
  @Equals('DELETE')
  op: 'DELETE';

  @IsObject()
  session_variables: object;

  @IsObject()
  @ValidateNested()
  @Type(() => GenericDeleteEventDataDto)
  data: GenericDeleteEventDataDto;
}

export class GenericPayloadDto {
  @IsUUID()
  id: string;

  @IsDateString()
  created_at: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TableDto)
  table: TableDto;

  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'op',
      subTypes: [
        { value: GenericInsertEventDto, name: 'INSERT' },
        { value: GenericUpdateEventDto, name: 'UPDATE' },
        { value: GenericDeleteEventDto, name: 'DELETE' },
      ],
    },
  })
  event: GenericInsertEventDto | GenericUpdateEventDto | GenericDeleteEventDto;
}

// Example of a request body:
// {
//   "id": "94b91b4d-50a4-4246-b48f-98b64712204d",
//   "created_at": "2022-09-27T13:23:11+0000",
//   "trigger": {
//       "name": "test"
//   },
//   "table": {
//       "schema": "user",
//       "name": "user"
//   },
//   "event": {
//       "session_variables": {},
//       "op": "INSERT",
//       "data": {
//           "old": null,
//           "new": {}
//       }
//   }
// }
