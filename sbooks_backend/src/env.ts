import { getenv, getEnvNumber} from './helpers/core.helper';

export const env = {
  host: getenv('HOST', '0.0.0.0'),
  port: getEnvNumber('PORT', 3741),
  apiKey: getenv('API_KEY'),
  db: {
    url: getenv('PG_DB_CONNECTION')
  }  
};
