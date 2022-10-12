import * as Joi from 'joi';

const AWS_ARN_REGEX =
  /^arn:([^:\n]*):([^:\n]*):([^:\n]*):([^:\n]*):(([^:\/\n]*)[:\/])?(.*)$/;

export type SQSConfig = { QUEUE_ARN: string };

export const sqsConfigValidationSchema = Joi.object<SQSConfig, true>({
  QUEUE_ARN: Joi.string().regex(AWS_ARN_REGEX).required(),
});
