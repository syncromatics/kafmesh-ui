import { Server } from './server';
import express from 'express';

const app = express();

const port = process.env.PORT || 5000;
const graphQL = process.env.KAFMESH_URL;

if (graphQL == undefined || graphQL == '') {
	throw 'KAFMESH_URL is not set';
}

const server = new Server(app, graphQL);
server.start(Number(port));
