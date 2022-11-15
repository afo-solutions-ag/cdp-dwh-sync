import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { snsConfigValidationSchema } from './sns.config';
import { SNSService } from './sns.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: snsConfigValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [SNSService],
})
export class SNSModule {}
