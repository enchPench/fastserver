import awsLambdaFastify from '@fastify/aws-lambda';
import server from './main.js';

const proxy = awsLambdaFastify(server())
export default proxy;