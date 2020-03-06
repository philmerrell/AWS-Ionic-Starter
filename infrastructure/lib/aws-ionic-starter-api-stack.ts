import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';

import * as targets from '@aws-cdk/aws-route53-targets';
import * as lambda from '@aws-cdk/aws-lambda';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as cognito from '@aws-cdk/aws-cognito';
import { VerificationEmailStyle } from '@aws-cdk/aws-cognito';

interface EnvProps extends cdk.StackProps {
    certArn: string;
    cognitoDomain: string;
    clientDomainName: string;
    apiDomainName: string;
}

export class AwsIonicStarterApiStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: EnvProps) {
        super(scope, id, props);

        // this tag gets applied to all resources declared in this construct
        this.node.applyAspect(new cdk.Tag('Stack', 'AWS-Ionic-Starter-Api'));

        /**
         * Cognito - A resource for authenticating our client
         * @property cognitoDomain - expects a string that represents a subdomain for the generated
         * cognito url. If a custom url is preferred, more set up is required
         * 
         * @returns - User Pool application client id that is passed as an environment variable to the lambda node api
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
            domain: props.cognitoDomain,
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



        /**
         * Lambda - Function to host ExpressJS Api
         * @property - certArn
         */

        const apiLambda = new lambda.Function(this, 'AwsStarterApiFunction', {
            code: new lambda.AssetCode('../api'),
            handler: 'server.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(10),
            environment: {
                userPoolClientId,
                cognitoBaseUrl: `https://${props.cognitoDomain}.auth.us-west-2.amazoncognito.com`
            }
        });


        /**
         * Api Gateway -
         * @property clientDomainName - required to set the CORS allowed origins
         * @property apiDomainName - required to set the api domain name
         * @property certArn - Arn the the ssl cert used to create api gateway domain name
         * @property apiLambda - Instance of the lambda function that handles all requests from this api
         */

        const sslCert = certificateManager.Certificate.fromCertificateArn(this, 'SslCertArn', props.certArn);
        const zone = route53.HostedZone.fromLookup(this, 'GetHostedZone', {
            domainName: 'philmerrell.com',
        });

        const api = new apigateway.LambdaRestApi(this, 'AwsStarterApiGateway', {
            restApiName: 'Aws Starter Api',
            description: 'Api gateway for the Aws-Ionic-Starter web application',
            handler: apiLambda,
            defaultCorsPreflightOptions: {
                allowOrigins: [
                    "http://localhost:8100",
                    `https://${props.clientDomainName}`
                ],
                allowMethods: [
                    "GET",
                    "POST",
                    "OPTIONS",
                    "PUT",
                    "DELETE"
                ],
            },
            domainName: {
                domainName: props.apiDomainName,
                certificate: sslCert
            }
        });

        new route53.ARecord(this, 'CreateAliasRecord', {
            recordName: 'starter-api',
            zone: zone,
            target: route53.RecordTarget.fromAlias(new targets.ApiGateway(api))
        })


        /**
         * Api Gateway v2 ----- WIP
         */


        // const apiGateway = new apigatewayv2.CfnApi(this, 'AwsStarterApiGatewayV2', {
        //     corsConfiguration: {
        //         allowHeaders: [
        //             "origin",
        //             "x-requested-with",
        //             "content-type",
        //             "accept",
        //             "authorization"
        //         ],
        //         allowMethods: [
        //             "GET",
        //             "POST",
        //             "OPTIONS",
        //             "PUT",
        //             "DELETE"
        //         ],
        //         allowOrigins: [
        //             "http://localhost:8100",
        //             `https://${props.clientDomainName}`
        //         ]
        //     },
        //     target: apiLambda.functionArn,
        //     protocolType: "HTTP",
        //     routeKey: 'ANY /{proxy+}'
        // });

        // new apigatewayv2.CfnDomainName(this, 'ApiDomainName', {
        //     domainName: props.apiDomainName,
        //     domainNameConfigurations: [
        //         {
        //            certificateArn: props.certArn
        //         }
        //     ]
        // });

        // new route53.ARecord(this, 'CreateApiAliasRecord', {
        //     recordName: 'starter-api',
        //     zone: zone,
            // target: route53.RecordTarget.fromAlias(new targets.) <--- the problem
        // });
    }
}