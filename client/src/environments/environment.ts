// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cognito: {
    clientId: '7re02kn8g5h77283sja2an48mu',
    baseUrl: 'https://auth-philmerrell.auth.us-west-2.amazoncognito.com',
    callbackUrl: 'http%3A%2F%2Flocalhost%3A8100%2Fcallback',
    get loginUrl() {
      return `${this.baseUrl}/login?response_type=code&client_id=${this.clientId}&redirect_uri=${this.callbackUrl}`
    },
    get signUpUrl() {
      return `${this.baseUrl}/signup?response_type=code&client_id=${this.clientId}&redirect_uri=${this.callbackUrl}`
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
