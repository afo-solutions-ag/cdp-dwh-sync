import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { graphQLConfigValidationSchema } from './graphql.config';
import { GraphQLService } from './graphql.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: graphQLConfigValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [GraphQLService],
  exports: [GraphQLService],
})
export class GraphQLModule {}
