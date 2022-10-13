import {
  GenericDeleteEventDataDto,
  GenericDeleteEventDto,
  GenericInsertEventDataDto,
  GenericInsertEventDto,
  GenericPayloadDto,
  GenericUpdateEventDataDto,
  GenericUpdateEventDto,
} from '../trigger-hook/trigger-hook.dtos';

// GENERIC EVENT DATA DTOs

type GenericInsertEventData<T = object> = Omit<
  GenericInsertEventDataDto,
  'new'
> & {
  new: T;
};

type GenericUpdateEventData<T = object> = Omit<
  GenericUpdateEventDataDto,
  'old' | 'new'
> & {
  old: T;
  new: T;
};

type GenericDeleteEventData<T = object> = Omit<
  GenericDeleteEventDataDto,
  'old'
> & {
  old: T;
};

export const getInsertEventData = <T = object>(
  o: T,
): GenericInsertEventData<T> => ({
  old: null,
  new: { ...o },
});

export const getUpdateEventData = <T = object>(
  oldO: T,
  newO: T,
): GenericUpdateEventData<T> => ({
  old: { ...oldO },
  new: { ...newO },
});

export const getDeleteEventData = <T = object>(
  o: T,
): GenericDeleteEventData<T> => ({
  new: null,
  old: { ...o },
});

// GENERIC EVENT DTOs

type GenericInsertEvent<T = object> = Omit<GenericInsertEventDto, 'data'> & {
  data: GenericInsertEventData<T>;
};

type GenericUpdateEvent<T = object> = Omit<GenericUpdateEventDto, 'data'> & {
  data: GenericUpdateEventData<T>;
};

type GenericDeleteEvent<T = object> = Omit<GenericDeleteEventDto, 'data'> & {
  data: GenericDeleteEventData<T>;
};

export const getInsertEvent = <T = object>(o: T): GenericInsertEvent<T> => ({
  op: 'INSERT',
  session_variables: {},
  data: getInsertEventData(o),
});

export const getUpdateEvent = <T = object>(
  oldO: T,
  newO: T,
): GenericUpdateEvent<T> => ({
  op: 'UPDATE',
  session_variables: {},
  data: getUpdateEventData(oldO, newO),
});

export const getDeleteEvent = <T = object>(o: T): GenericDeleteEvent<T> => ({
  op: 'DELETE',
  session_variables: {},
  data: getDeleteEventData(o),
});

// GENERIC PAYLOAD DTOs

type GenericInsertPayload<T = object> = Omit<GenericPayloadDto, 'event'> & {
  event: GenericInsertEvent<T>;
};

type GenericUpdatePayload<T = object> = Omit<GenericPayloadDto, 'event'> & {
  event: GenericUpdateEvent<T>;
};

type GenericDeletePayload<T = object> = Omit<GenericPayloadDto, 'event'> & {
  event: GenericDeleteEvent<T>;
};

export const getInsertPayload = <T = object>(
  o: T,
): GenericInsertPayload<T> => ({
  id: '94b91b4d-50a4-4246-b48f-98b64712204d',
  created_at: '2022-09-01T13:23:11+0000',
  table: { schema: '', name: '' },
  event: getInsertEvent(o),
});

export const getUpdatePayload = <T = object>(
  oldO: T,
  newO: T,
): GenericUpdatePayload<T> => ({
  id: '94b91b4d-50a4-4246-b48f-98b64712204d',
  created_at: '2022-09-01T13:23:11+0000',
  table: { schema: '', name: '' },
  event: getUpdateEvent(oldO, newO),
});

export const getDeletePayload = <T = object>(
  o: T,
): GenericDeletePayload<T> => ({
  id: '94b91b4d-50a4-4246-b48f-98b64712204d',
  created_at: '2022-09-01T13:23:11+0000',
  table: { schema: '', name: '' },
  event: getDeleteEvent(o),
});
