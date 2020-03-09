import * as cdk from '@aws-cdk/core';

export interface ApiStackProps extends cdk.StackProps {
  apiDomainName: string;
  certArn: string;
  clientDomainName: string;
  cognitoCallbackRoute: string;
  cognitoDomain: string;
  cognitoLogoutRoute: string;
  route53ZoneDomainName: string;
  tagKey: string;
  tagValue: string;
}

export const apiStackProps = {
  env: {
    account: '878042393904',
    region: 'us-west-2'
  },
  stackName: 'AwsIonicStarterApiStack',
  description: 'A stack for hosting the client side assets.',
  certArn: 'arn:aws:acm:us-west-2:878042393904:certificate/3c39f849-54ea-43ae-97aa-51306906720a',
  clientDomainName: 'starter.philmerrell.com',
  cognitoDomain: 'auth-starter',
  cognitoCallbackRoute: '/callback',
  cognitoLogoutRoute: '/logout',
  apiDomainName: 'starter-api.philmerrell.com',
  route53ZoneDomainName: 'philmerrell.com',
  tagKey: 'Stack',
  tagValue: 'Aws-Starter-Api-Stack'
}