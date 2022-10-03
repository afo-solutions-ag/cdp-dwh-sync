import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsObject,
  IsOptional,
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

export class GenericEventDataDto {
  @IsOptional()
  @IsObject()
  old: object | null;

  @IsOptional()
  @IsObject()
  new: object | null;
}

export class GenericEventDto {
  @IsObject()
  session_variables: object;

  @IsIn(['INSERT', 'UPDATE', 'DELETE', 'MANUAL'])
  op: 'INSERT' | 'UPDATE' | 'DELETE' | 'MANUAL';

  @IsObject()
  @ValidateNested()
  @Type(() => GenericEventDataDto)
  data: GenericEventDataDto;
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
  @Type(() => GenericEventDto)
  event: GenericEventDto;
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
