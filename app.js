const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');
dotenv.config({ path: './config.env' });

const hostname = '127.0.0.1';
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production'; //只在开发环境使用
const app = next({
	dev,
	hostname,
	port,
});

const handle = app.getRequestHandler();

app
	.prepare()
	.then(() => {
		const server = express();
		//写在这里可以获取环境变量
		const devProxy = {
			[process.env.NEXT_PUBLIC_BASE_API]: {
				target: 'http://localhost:10000', // 外网测试环境
				changeOrigin: true,
				// pathRewrite: { '^/webapi': '' },
				pathRewrite: { [`^${process.env.NEXT_PUBLIC_BASE_API}`]: '' },
			},
			[process.env.NEXT_PUBLIC_WEBSOCKET_PUSH_API]: {
				target: 'ws://localhost:10000', // 外网ws测试环境
				changeOrigin: true,
				ws: true,
				// pathRewrite: { '^/wsapi': '' },
				pathRewrite: { [`^${process.env.NEXT_PUBLIC_WEBSOCKET_PUSH_API}`]: '' },
			},
		};

		if (dev && devProxy) {
			for (const context in devProxy) {
				server.use(createProxyMiddleware(context, devProxy[context]));
			}
		}
		server.all('*', (req, res) => {
			handle(req, res);
		});

		server.listen(port, (err) => {
			if (err) {
				throw err;
			}
			console.log(`http://0.0.0.0:${port}`);
			console.log(`> Ready on http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.log('An error occurred, unable to start the server');
		console.log(err);
	});
