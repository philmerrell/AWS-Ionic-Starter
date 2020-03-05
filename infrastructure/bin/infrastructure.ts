#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CDKStarterStack } from '../lib/infrastructure-stack';
import { AwsIonicStarterClientStack } from '../lib/aws-ionic-starter-client-stack';
import { AwsIonicStarterApiStack } from '../lib/aws-ionic-starter-api-stack';

const app = new cdk.App();
// new CDKStarterStack(app, 'CDKStarterStack');

// new AwsIonicStarterClientStack(app, 'AwsIonicStarterClientStack', {
//     env: {
//         account: '878042393904',
//         region: 'us-west-2'
//     },
//     stackName: 'AwsIonicStarterClientStack',
//     description: 'A stack for hosting the client side assets.',
//     certArn: 'arn:aws:acm:us-east-1:878042393904:certificate/56a74ab7-e2f4-4da2-88ed-d6e832ad0946',
//     domainName: 'starter.philmerrell.com'  
// });

new AwsIonicStarterApiStack(app, 'AwsIonicStarterApiStack', {
    env: {
        account: '878042393904',
        region: 'us-west-2'
    },
    stackName: 'AwsIonicStarterApiStack',
    description: 'A stack for hosting the client side assets.',
    certArn: 'arn:aws:acm:us-east-1:878042393904:certificate/56a74ab7-e2f4-4da2-88ed-d6e832ad0946',
    cognitoDomain: 'auth.philmerrell.com'
});