import * as Joi from 'joi';

const AWS_ARN_REGEX =
  /^arn:([^:\n]*):([^:\n]*):([^:\n]*):([^:\n]*):(([^:\/\n]*)[:\/])?(.*)$/;

export type SNSConfig = { TOPIC_ARN: string };

export const snsConfigValidationSchema = Joi.object<SNSConfig, true>({
  TOPIC_ARN: Joi.string().regex(AWS_ARN_REGEX).required(),
});
