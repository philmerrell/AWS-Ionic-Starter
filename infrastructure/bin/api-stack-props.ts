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
  certArn: 'arn:aws:acm:us-west-2:878042393904:certificate/7956b112-aa8c-4b84-98ee-e80a52b029b4',
  clientDomainName: 'starter.philmerrell.com',
  cognitoDomain: 'auth-starter',
  cognitoCallbackRoute: '/callback',
  cognitoLogoutRoute: '/logout',
  apiDomainName: 'starter-api.philmerrell.com',
  route53ZoneDomainName: 'philmerrell.com',
  tagKey: 'Stack',
  tagValue: 'Aws-Starter-Api-Stack'
}