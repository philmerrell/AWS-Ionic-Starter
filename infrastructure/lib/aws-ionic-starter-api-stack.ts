import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as targets from '@aws-cdk/aws-route53-targets';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as cognito from '@aws-cdk/aws-cognito';
import { VerificationEmailStyle } from '@aws-cdk/aws-cognito';

interface EnvProps extends cdk.StackProps {
    certArn: string;
    cognitoDomain: string;
}

export class AwsIonicStarterApiStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: EnvProps) {
        super(scope, id, props);
    
        // this tag gets applied to all resources declared in this construct
        this.node.applyAspect(new cdk.Tag('Stack', 'AWS-Ionic-Starter-Api'));


        /**
         * Cognito - A resource for authenticating our client
         */
        
        const userPool = new cognito.UserPool(this, 'ApiUserPool', {
            userPoolName: 'aws-starter-userpool',
            selfSignUpEnabled: true,
            userVerification: {
                emailSubject: 'Verify your email for our awesome app!',
                emailBody: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
                emailStyle: VerificationEmailStyle.CODE,
            },
            signInAliases: {
                email: true
            },
            autoVerify: { email: true }
        });

        new cognito.CfnUserPoolDomain(this, 'UserPoolDomain', {
            domain: 'auth-philmerrell',
            userPoolId: userPool.userPoolId
        });

        const userPoolClient = new cognito.CfnUserPoolClient(this, 'UserPoolClient', {
            userPoolId: userPool.userPoolId,
            generateSecret: true,
            allowedOAuthFlows: ['code'],
            allowedOAuthScopes: ['email', 'openid', 'profile'],
            clientName: 'aws-starter-client',
            refreshTokenValidity: 365,
            allowedOAuthFlowsUserPoolClient: true,
            supportedIdentityProviders: ['COGNITO'],
            explicitAuthFlows: ['ALLOW_REFRESH_TOKEN_AUTH', 'ALLOW_USER_SRP_AUTH', 'ALLOW_USER_PASSWORD_AUTH'],
            callbackUrLs: ['https://starter.philmerrell.com/callback', 'http://localhost:8100/callback']
        });

        const userPoolClientId = userPoolClient.ref;
        new cdk.CfnOutput(this, 'AppClientId', { value: userPoolClientId });
        
    }
}