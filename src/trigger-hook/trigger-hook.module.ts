import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from 'src/graphql/graphql.module';
import { GraphQLService } from 'src/graphql/graphql.service';
import { SQSModule } from 'src/sqs/sqs.module';
import { SQSService } from 'src/sqs/sqs.service';
import { TriggerHookController } from './trigger-hook.controller';
import { TriggerHookService } from './trigger-hook.service';

@Module({
  imports: [SQSModule, GraphQLModule],
  providers: [TriggerHookService, SQSService, GraphQLService, ConfigService],
  controllers: [TriggerHookController],
})
export class TriggerHookModule {}
