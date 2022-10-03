import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient } from 'graphql-request';
import gql from 'graphql-tag';
import { GraphQLConfig } from './graphql.config';
import { getSdk, Sdk } from './graphql.sdk';

type UUID = string;
type User = Awaited<ReturnType<Sdk['User']>>['user_by_pk'];

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

  async getUser(userId: string): Promise<User> {
    const sdk = getSdk(this.client);
    const userData = await sdk.User({ userId });

    return userData.user_by_pk;
  }

  async getUserSystemIds(userId: UUID): Promise<UUID[]> {
    const sdk = getSdk(this.client);
    const userSystemIdsData = await sdk.UserSystemIds({ userId });

    return userSystemIdsData.user_by_pk.unit_access.map(
      (unitAccess) => unitAccess.unit.system_id,
    );
  }

  async getSystemIds(): Promise<UUID[]> {
    const sdk = getSdk(this.client);
    const systemIdsData = await sdk.SystemIds();

    return systemIdsData.system.map((system) => system.id);
  }
}

gql`
  query User($userId: uuid!) {
    user_by_pk(id: $userId) {
      id
      email
      first_name
      last_name
    }
  }
`;

gql`
  query UserSystemIds($userId: uuid!) {
    user_by_pk(id: $userId) {
      id
      unit_access {
        unit {
          system_id
        }
      }
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
