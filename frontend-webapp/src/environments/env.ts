export interface Env {
  /**
   * Whether or not this is in production build.
   */
  production: boolean;
  /**
   * Facebook-related settings.
   */
  facebook: {
    /**
     * An app ID.
     */
    appId: string;
  };
  /**
   * Google-related settings.
   */
  google: {
    /**
     * An API key.
     */
    apiKey: string;
  };
}
