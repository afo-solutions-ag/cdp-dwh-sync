import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { sqsConfigValidationSchema } from './sqs.config';
import { SQSService } from './sqs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: sqsConfigValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [SQSService],
})
export class SQSModule {}
