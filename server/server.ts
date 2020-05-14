import { Express, Request, Response } from 'express';
import express from 'express';
import * as path from 'path';
import proxy from 'http-proxy';
import http from 'http';
import * as terminus from '@godaddy/terminus';

export class Server {
	private app: Express;
	private proxy: proxy;
	private graphQLServer: string;

	constructor(app: Express, graphQLServer: string) {
		this.app = app;
		this.graphQLServer = graphQLServer;

		this.proxy = proxy.createProxy({
			ws: true,
			toProxy: true,
			changeOrigin: true,
			autoRewrite: true,
			headers: {
				host: graphQLServer
			}
		});

		this.proxy.on('error', function(err, req, res) {
			res.end('Something went wrong. And we are reporting a custom error message.');
		});

		this.app.use(express.static(path.resolve('./') + '/app'));

		this.app.use('/query', (req, resp) => {
			this.proxy.web(req, resp, {
				ignorePath: true,
				target: 'http://' + graphQLServer + '/query'
			});
		});

		this.app.use('/playground', (req, resp) => {
			this.proxy.web(req, resp, {
				ignorePath: true,
				target: 'http://' + graphQLServer + '/'
			});
		});

		this.app.all('*', (req: Request, res: Response): void => {
			res.sendFile(path.resolve('./') + '/app/index.html');
		});
	}

	private async onHealthCheck() {
		// checks if the system is healthy, like the db connection is live
		// resolves, if health, rejects if not
	}

	private async onSignal() {
		console.log('server shutting down');
	}

	public start(port: number): void {
		const server = http.createServer(this.app);
		terminus.createTerminus(server, {
			signal: 'SIGINT',
			healthChecks: { '/healthcheck': this.onHealthCheck },
			onSignal: this.onSignal
		});

		var app = this;
		server.on('upgrade', function(req, socket, head) {
			app.proxy.ws(req, socket, head, {
				target: 'ws://' + app.graphQLServer
			});
		});

		console.log('started server');
		server.listen(port, () => console.log(`Server listening on port ${port}!`));
	}
}
