// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvConfig } from './environment-config';

export const environment: EnvConfig = {
  hostName: 'localhost',
  production: false,
  apis: {
    hackerNews: 'https://localhost:7282',
  },
};
