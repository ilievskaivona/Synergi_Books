/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

require('dotenv').config();

/** Returns environment varaible */
export const getenv = <T = string>(name: string, defaultValue: T = '' as unknown as T): T => {
  if (name in process.env) {
    const value: unknown = process.env[name];

    switch (value) {
      case 'true':
        return true as unknown as T;
      case 'false':
        return false as unknown as T;
      default:
        return value as T;
    }
  }
  return defaultValue;
};

/** Returns environment variable as a number */
export const getEnvNumber = (name: string, defaultValue = 0): number => {
  const value = Number(getenv(name));
  return name !== '' ? value : defaultValue;
};
