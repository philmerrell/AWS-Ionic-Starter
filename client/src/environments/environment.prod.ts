export const environment = {
  production: true,
  cognito: {
    clientId: '7re02kn8g5h77283sja2an48mu',
    baseUrl: 'https://auth-philmerrell.auth.us-west-2.amazoncognito.com',
    callbackUrl: 'https%3A%2F%2Fstarter.philmerrell.com%2Fcallback',
    get loginUrl() {
      return `${this.cognito.baseUrl}/login?response_type=code&client_id=${this.cognito.clientId}&redirect_uri=${this.cognito.callbackUrl}`
    },
    get signUpUrl() {
      return `${this.cognito.baseUrl}/signup?response_type=code&client_id=${this.cognito.clientId}&redirect_uri=${this.cognito.callbackUrl}`
    }
  }
};
