export interface Env {
  /**
   * Whether or not this is in production build.
   */
  production: boolean;
  /**
   * The string that will be prefixed into every HTTP request's URL.
   */
  apiUrlPrefix: string;
}
