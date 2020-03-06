import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import Infrastructure = require('../lib/aws-ionic-starter-client-stack');

const clientStackProps = {
  env: {
      account: '878042393904',
      region: 'us-west-2'
  },
  stackName: 'AwsIonicStarterClientStack',
  description: 'A stack for hosting the client side assets.',
  certArn: 'arn:aws:acm:us-east-1:878042393904:certificate/56a74ab7-e2f4-4da2-88ed-d6e832ad0946',
  domainName: 'starter.philmerrell.com'  
};

test('Route53 Alias Record Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Infrastructure.AwsIonicStarterClientStack(app, 'MyTestApiStack', clientStackProps);
    // THEN
    expectCDK(stack).to(haveResource("AWS::Route53::RecordSet", {
      Type: 'A'
    }));
});

test('Cloudfront Distribution Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infrastructure.AwsIonicStarterClientStack(app, 'MyTestApiStack', clientStackProps);
  // THEN
  expectCDK(stack).to(haveResource("AWS::CloudFront::Distribution"));
});
