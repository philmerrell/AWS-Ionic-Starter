import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import Infrastructure = require('../lib/aws-ionic-starter-api-stack');

const apiStackProps = {
    env: {
        account: '878042393904',
        region: 'us-west-2'
    },
    stackName: 'AwsIonicStarterApiStack',
    description: 'A stack for hosting the client side assets.',
    certArn: 'arn:aws:acm:us-west-2:878042393904:certificate/7956b112-aa8c-4b84-98ee-e80a52b029b4',
    cognitoDomain: 'auth-philmerrell',
    clientDomainName: 'starter.philmerrell.com',
    apiDomainName: 'starter-api.philmerrell.com'
};

test('Lambda Function Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Infrastructure.AwsIonicStarterApiStack(app, 'MyTestApiStack', apiStackProps);
    // THEN
    expectCDK(stack).to(haveResource("AWS::Lambda::Function"));
});

test('Api Gateway Rest Api Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infrastructure.AwsIonicStarterApiStack(app, 'MyTestApiStack', apiStackProps);
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi"));
});
