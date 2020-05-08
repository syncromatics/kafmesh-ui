import { Express, Request, Response } from 'express';
import express from 'express';
import * as path from 'path';
import proxy from 'express-http-proxy';

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

		this.app.all('*', (req: Request, res: Response): void => {
			res.sendFile(path.resolve('./') + '/app/index.html');
		});
	}

	public start(port: number): void {
		console.log('started server');
		this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
	}
}
