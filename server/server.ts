import { Express, Request, Response } from 'express';
import express from 'express';
import * as path from 'path';
import proxy from 'express-http-proxy';
import http from 'http';
import * as terminus from '@godaddy/terminus';

export class Server {
	private app: Express;

	constructor(app: Express, graphQLServer: string) {
		this.app = app;

		this.app.use(express.static(path.resolve('./') + '/app'));

		this.app.use(
			'/query',
			proxy(graphQLServer, {
				proxyReqPathResolver: function(req) {
					return '/query';
				}
			})
		);

		this.app.use(
			'/playground',
			proxy(graphQLServer, {
				proxyReqPathResolver: function(req) {
					return '/';
				}
			})
		);

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
		console.log('started server');
		server.listen(port, () => console.log(`Server listening on port ${port}!`));
	}
}
