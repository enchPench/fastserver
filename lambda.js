import awsLambdaFastify from '@fastify/aws-lambda';
import server from './server.js';

const proxy = awsLambdaFastify(server())
export default proxy;