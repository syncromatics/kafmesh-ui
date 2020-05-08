import { Server } from './server';
import express from 'express';
import * as terminus from '@godaddy/terminus';

const app = express();

const port = process.env.PORT || 5000;
const graphQL = process.env.KAFMESH_URL;

if (graphQL == undefined || graphQL == '') {
	throw 'KAFMESH_URL is not set';
}

async function onSignal() {
	console.log('server is starting cleanup');
	// start cleanup of resource, like databases or file descriptors
}

async function onHealthCheck() {
	// checks if the system is healthy, like the db connection is live
	// resolves, if health, rejects if not
}

terminus.createTerminus(app, {
	signal: 'SIGINT',
	healthChecks: { '/healthcheck': onHealthCheck },
	onSignal: onSignal
});

const server = new Server(app, graphQL);
server.start(Number(port));
