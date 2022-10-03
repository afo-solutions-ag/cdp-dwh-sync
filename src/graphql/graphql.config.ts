import * as Joi from 'joi';

export type GraphQLConfig = {
  HASURA_ENDPOINT: string;
  HASURA_ADMIN_SECRET: string;
};

export const graphQLConfigValidationSchema = Joi.object<GraphQLConfig, true>({
  HASURA_ENDPOINT: Joi.string().uri().required(),
  HASURA_ADMIN_SECRET: Joi.string().required(),
});
