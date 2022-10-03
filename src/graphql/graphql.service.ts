import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient } from 'graphql-request';
import gql from 'graphql-tag';
import { GraphQLConfig } from './graphql.config';
import { getSdk, Sdk } from './graphql.sdk';

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

  async getUser(userId: string): Promise<User | undefined> {
    const sdk = getSdk(this.client);
    const userData = await sdk.User({ id: userId });

    return userData.user_by_pk;
  }
}

gql`
  query User($id: uuid!) {
    user_by_pk(id: $id) {
      id
      email
      first_name
      last_name
    }
  }
`;
