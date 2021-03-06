import { Env } from './env';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: Env = {
  production: false,
  facebook: {
    appId: '132853970755931'
  },
  google: {
    apiKey: 'AIzaSyAaQHydaUz5xiK4904ToFannKud3kl07jg'
  }
};
