const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin =
	require('webpack').HotModuleReplacementPlugin;
const deps = require('../package.json').dependencies;

module.exports = {
	entry: path.resolve(__dirname, '..', './src/index.ts'),
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HotModuleReplacementPlugin(),
		new ModuleFederationPlugin({
			name: 'shared', // Name of micro-frontend
			library: { type: 'var', name: 'shared' },
			filename: 'remoteEntry.js', // Name of remote entry file
			exposes: {
				'./App': './src/App',
				'./module-handler': './src/store/module-handler',
			},
			// remotes: {
			// 	app1: 'app1',
			// },
			shared: {
				react: {
					eager: true,
				},
				'react-dom': {
					eager: true,
				},
				zustand: {
					eager: true,
				},
			},
		}),
		new HtmlWebpackPlugin({
			title: 'Shared',
			template: path.resolve(__dirname, '..', './src/index.html'),
		}),
	],
	output: {
		path: path.resolve(__dirname, '..', './dist'),
		filename: 'bundle.js',
	},
	devServer: {
		port: 3003,
		static: path.resolve(__dirname, '..', './dist'),
		hot: false,
		liveReload: true,
	},
};
