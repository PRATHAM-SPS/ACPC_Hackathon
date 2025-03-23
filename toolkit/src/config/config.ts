import { config as envConfig } from "dotenv";
envConfig();


interface Config{
    port:string |undefined,
    mongooseConnection:string|undefined,
    env:string|undefined,
    redisConnection:string|undefined
    nodemailer_host:string|undefined,
    nodemailer_port:string|undefined,
    nodemailer_user:string|undefined,
    nodemailer_password:string|undefined

}

const _config:Config = {
  port: process.env.PORT,
  mongooseConnection: process.env.MONGOOSE_CONNECTION,
  env: process.env.NODE_ENV,
  redisConnection: process.env.REDIS_CONNECTION,
  nodemailer_host: process.env.NODEMAILER_HOST,
  nodemailer_port: process.env.NODEMAILER_PORT,
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_password: process.env.NODEMAILER_PASSWORD,
};

export const config = {
  get: (key:keyof Config) => {
    if (!_config[key]) {
      console.error(`Unable to get ${key} value`);
      process.exit(1);
    }
    return _config[key] as string;
  },
};
