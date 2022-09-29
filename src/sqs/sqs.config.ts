import * as Joi from 'joi';

export const AWS_REGIONS = [
  'us-east-2',
  'us-east-1',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-southeast-3',
  'ap-south-1',
  'ap-northeast-3',
  'ap-northeast-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ca-central-1',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-south-1',
  'eu-west-3',
  'eu-north-1',
  'me-south-1',
  'me-central-1',
  'sa-east-1',
];

const ACCESS_KEY_ID_REGEX = /^[A-Z0-9]{20}$/;
const SECRET_ACCESS_KEY_REGEX = /^[a-zA-Z0-9+/=]{40}$/;

export type SQSConfig = {
  REGION: string;
  ACCESS_KEY_ID: string;
  SECRET_ACCESS_KEY: string;
  QUEUE_URL: string;
};

export const sqsConfigValidationSchema = Joi.object<SQSConfig, true>({
  REGION: Joi.string()
    .valid(...AWS_REGIONS)
    .required(),
  ACCESS_KEY_ID: Joi.string().regex(ACCESS_KEY_ID_REGEX).required(),
  SECRET_ACCESS_KEY: Joi.string().regex(SECRET_ACCESS_KEY_REGEX).required(),
  QUEUE_URL: Joi.string().uri().required(),
});
