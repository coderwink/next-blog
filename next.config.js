/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'admin.wanzhengxing.cn',
				port: '',
				pathname: '/*',
			},
		],
	},
};

module.exports = nextConfig;
