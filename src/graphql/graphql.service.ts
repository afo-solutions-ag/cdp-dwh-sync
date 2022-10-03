import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient } from 'graphql-request';
import gql from 'graphql-tag';
import { GraphQLConfig } from './graphql.config';
import { getSdk } from './graphql.sdk';

type UUID = string;

@Injectable()
export class GraphQLService {
  private client: GraphQLClient;

  constructor(private readonly configService: ConfigService<GraphQLConfig>) {
    const baseUrl = this.configService.getOrThrow<string>('HASURA_ENDPOINT');
    const adminSecret = this.configService.getOrThrow<string>(
      'HASURA_ADMIN_SECRET',
    );

    this.client = new GraphQLClient(baseUrl, {
      headers: { 'X-Hasura-Admin-Secret': adminSecret },
    });
  }

  async getUserSystemIds(userId: UUID): Promise<UUID[]> {
    const sdk = getSdk(this.client);
    const userSystemIdsData = await sdk.UserSystemIds({ userId });

    const systemIds = userSystemIdsData.user_by_pk?.unit_access
      .map((unitAccess) => unitAccess.unit?.system_id)
      .filter((systemId): systemId is UUID => !!systemId);

    return systemIds || [];
  }

  async getUnitSystemId(unitId: UUID): Promise<UUID | undefined> {
    const sdk = getSdk(this.client);
    const unitSystemIdsData = await sdk.UnitSystemIds({ unitId });

    return unitSystemIdsData.unit_by_pk?.system_id;
  }

  async getSystemIds(): Promise<UUID[]> {
    const sdk = getSdk(this.client);
    const systemIdsData = await sdk.SystemIds();

    return systemIdsData.system.map((system) => system.id);
  }
}

gql`
  query UserSystemIds($userId: uuid!) {
    user_by_pk(id: $userId) {
      unit_access {
        unit {
          system_id
        }
      }
    }
  }
`;

gql`
  query UnitSystemIds($unitId: uuid!) {
    unit_by_pk(id: $unitId) {
      system_id
    }
  }
`;

gql`
  query SystemIds {
    system {
      id
    }
  }
`;
