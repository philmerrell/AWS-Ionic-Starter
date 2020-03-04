#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CDKStarterStack } from '../lib/infrastructure-stack';

const app = new cdk.App();
new CDKStarterStack(app, 'CDKStarterStack');
