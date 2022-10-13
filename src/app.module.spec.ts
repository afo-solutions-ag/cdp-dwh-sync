import { INestApplication } from '@nestjs/common';

import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { GraphQLService } from './graphql/graphql.service';
import { SQSService } from './sqs/sqs.service';
import {
  getDeletePayload,
  getInsertPayload,
  getUpdatePayload,
} from './__mocks__/generic.dtos.mock';
import { globalAdmin as mockedGlobalAdmin } from './__mocks__/global-admin.dtos.mock';
import { redshiftConfiguration as mockedRedshiftConfiguration } from './__mocks__/reshift-configuration.dtos.mock';
import { systemAdmin as mockedSystemAdmin } from './__mocks__/system-admin.dtos.mock';
import { system as mockedSystem } from './__mocks__/system.dtos.mock';
import { unitUser as mockedUnitUser } from './__mocks__/unit-user.dtos.mock';
import { unit as mockedUnit } from './__mocks__/unit.dtos.mock';
import { user as mockedUser } from './__mocks__/user.dtos.mock';

const mockedSQSSendMessage: jest.Mock<ReturnType<SQSService['sendMessage']>> =
  jest.fn(() => Promise.resolve(true));

const mockedGraphQLGetUserSystemIds: jest.Mock<
  ReturnType<GraphQLService['getUserSystemIds']>
> = jest.fn(() => Promise.resolve([mockedSystem.id]));

const mockedGraphQLGetUnitSystemId: jest.Mock<
  ReturnType<GraphQLService['getUnitSystemId']>
> = jest.fn(() => Promise.resolve(mockedSystem.id));

const mockedGraphQLGetSystemIds: jest.Mock<
  ReturnType<GraphQLService['getSystemIds']>
> = jest.fn(() => Promise.resolve([mockedSystem.id]));

describe('App', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SQSService)
      .useValue({ sendMessage: mockedSQSSendMessage })
      .overrideProvider(GraphQLService)
      .useValue({
        getUserSystemIds: mockedGraphQLGetUserSystemIds,
        getUnitSystemId: mockedGraphQLGetUnitSystemId,
        getSystemIds: mockedGraphQLGetSystemIds,
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('/user (CREATE)', async () => {
    const payload = getInsertPayload(mockedUser);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/user')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'user', action: 'insert' });

    expect(mockedGraphQLGetUserSystemIds).toHaveBeenCalledTimes(0);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(0);
  });

  it('/user (UPDATE)', async () => {
    const payload = getUpdatePayload(mockedUser, mockedUser);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/user')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'user', action: 'update' });

    expect(mockedGraphQLGetUserSystemIds).toHaveBeenCalledTimes(2);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedGraphQLGetUserSystemIds).toHaveBeenNthCalledWith(
      1,
      mockedUser.id,
    );
    expect(mockedGraphQLGetUserSystemIds).toHaveBeenNthCalledWith(
      2,
      mockedUser.id,
    );

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'USER',
    );
  });

  it('/user (DELETE)', async () => {
    const payload = getDeletePayload(mockedUser);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/user')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'user', action: 'delete' });

    expect(mockedGraphQLGetSystemIds).toHaveBeenCalledTimes(1);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'USER',
    );
  });

  it('/unit (CREATE)', async () => {
    const payload = getInsertPayload(mockedUnit);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/unit')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'unit', action: 'insert' });

    expect(mockedGraphQLGetUnitSystemId).toHaveBeenCalledTimes(0);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedUnit.system_id },
      'UNIT',
    );
  });

  it('/unit (UPDATE)', async () => {
    const payload = getUpdatePayload(mockedUnit, mockedUnit);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/unit')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'unit', action: 'update' });

    expect(mockedGraphQLGetUnitSystemId).toHaveBeenCalledTimes(0);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedUnit.system_id },
      'UNIT',
    );
  });

  it('/unit (DELETE)', async () => {
    const payload = getDeletePayload(mockedUnit);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/unit')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'unit', action: 'delete' });

    expect(mockedGraphQLGetUnitSystemId).toHaveBeenCalledTimes(0);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedUnit.system_id },
      'UNIT',
    );
  });

  it('/unit_user (CREATE)', async () => {
    const payload = getInsertPayload(mockedUnitUser);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/unit_user')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'unit_user', action: 'insert' });

    expect(mockedGraphQLGetUnitSystemId).toHaveBeenCalledTimes(1);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedGraphQLGetUnitSystemId).toHaveBeenCalledWith(
      mockedUnitUser.unit_id,
    );
    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'USER',
    );
  });

  it('/unit_user (UPDATE)', async () => {
    const payload = getUpdatePayload(mockedUnitUser, mockedUnitUser);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/unit_user')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'unit_user', action: 'update' });

    expect(mockedGraphQLGetUnitSystemId).toHaveBeenCalledTimes(2);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedGraphQLGetUnitSystemId).toHaveBeenNthCalledWith(
      1,
      mockedUnitUser.unit_id,
    );
    expect(mockedGraphQLGetUnitSystemId).toHaveBeenNthCalledWith(
      2,
      mockedUnitUser.unit_id,
    );
    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'USER',
    );
  });

  it('/unit_user (DELETE)', async () => {
    const payload = getDeletePayload(mockedUnitUser);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/unit_user')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'unit_user', action: 'delete' });

    expect(mockedGraphQLGetUnitSystemId).toHaveBeenCalledTimes(1);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedGraphQLGetUnitSystemId).toHaveBeenCalledWith(
      mockedUnitUser.unit_id,
    );
    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'USER',
    );
  });

  it('/system_admin (CREATE)', async () => {
    const payload = getInsertPayload(mockedSystemAdmin);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/system_admin')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'system_admin', action: 'insert' });

    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystemAdmin.system_id },
      'USER',
    );
  });

  it('/system_admin (UPDATE)', async () => {
    const payload = getUpdatePayload(mockedSystemAdmin, mockedSystemAdmin);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/system_admin')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'system_admin', action: 'update' });

    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystemAdmin.system_id },
      'USER',
    );
  });

  it('/system_admin (DELETE)', async () => {
    const payload = getDeletePayload(mockedSystemAdmin);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/system_admin')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'system_admin', action: 'delete' });

    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystemAdmin.system_id },
      'USER',
    );
  });

  it('/global_admin', async () => {
    const payload = getInsertPayload(mockedGlobalAdmin);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/global_admin')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'global_admin', action: 'insert' });

    expect(mockedGraphQLGetSystemIds).toHaveBeenCalledTimes(1);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedGraphQLGetSystemIds).toHaveBeenCalledWith();
    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'USER',
    );
  });

  it('/global_admin (UPDATE)', async () => {
    const payload = getUpdatePayload(mockedGlobalAdmin, mockedGlobalAdmin);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/global_admin')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'global_admin', action: 'update' });

    expect(mockedGraphQLGetSystemIds).toHaveBeenCalledTimes(1);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedGraphQLGetSystemIds).toHaveBeenCalledWith();
    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'USER',
    );
  });

  it('/global_admin (DELETE)', async () => {
    const payload = getDeletePayload(mockedGlobalAdmin);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/global_admin')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'global_admin', action: 'delete' });

    expect(mockedGraphQLGetSystemIds).toHaveBeenCalledTimes(1);
    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedGraphQLGetSystemIds).toHaveBeenCalledWith();
    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'USER',
    );
  });

  it('/system (CREATE)', async () => {
    const payload = getInsertPayload(mockedSystem);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/system')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'system', action: 'insert' });

    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'SYSTEM',
    );
  });

  it('/system (UPDATE)', async () => {
    const payload = getUpdatePayload(mockedSystem, mockedSystem);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/system')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'system', action: 'update' });

    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'SYSTEM',
    );
  });

  it('/system (DELETE)', async () => {
    const payload = getDeletePayload(mockedSystem);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/system')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ entity: 'system', action: 'delete' });

    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedSystem.id },
      'SYSTEM',
    );
  });

  it('/redshift_configuration', async () => {
    const payload = getInsertPayload(mockedRedshiftConfiguration);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/redshift_configuration')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      entity: 'redshift_configuration',
      action: 'insert',
    });

    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedRedshiftConfiguration.system_id },
      'REDSHIFT_CONFIGURATION',
    );
  });

  it('/redshift_configuration (UPDATE)', async () => {
    const payload = getUpdatePayload(
      mockedRedshiftConfiguration,
      mockedRedshiftConfiguration,
    );

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/redshift_configuration')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      entity: 'redshift_configuration',
      action: 'update',
    });

    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedRedshiftConfiguration.system_id },
      'REDSHIFT_CONFIGURATION',
    );
  });

  it('/redshift_configuration (DELETE)', async () => {
    const payload = getDeletePayload(mockedRedshiftConfiguration);

    const response = await request(app.getHttpServer())
      .post('/trigger-hook/redshift_configuration')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      entity: 'redshift_configuration',
      action: 'delete',
    });

    expect(mockedSQSSendMessage).toHaveBeenCalledTimes(1);

    expect(mockedSQSSendMessage).toHaveBeenCalledWith(
      { systemId: mockedRedshiftConfiguration.system_id },
      'REDSHIFT_CONFIGURATION',
    );
  });
});
