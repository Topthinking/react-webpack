const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const defaultPort = 8001;

module.exports = {
	entry:"./src/index",
	output:{
		path: path.join(__dirname, '/../dist/assets'),
    	filename: 'app.js',
    	publicPath:'/assets/'
	},
	devServer:{
		contentBase: './src/',
		historyApiFallback: true,
	    hot:true,
	    inline:true,
	    port:defaultPort
	},
	module:{
		loaders:[
			{
				test: /\.html$/,
				loader:'html-loader'
			},
			{
				test: /\.(js|jsx)$/,
				exclude:/node_modules/,
				loader:'react-hot-loader!babel-loader'
			},
			{
				test: /\.less$/,
				exclude:/node_modules/,
				loader:'style-loader!css-loader!less-loader'
			},
			{
				test: /\.(jpg|png|gif)$/,
				exclude:/node_modules/,
				loader:'url-loader'
			},
			{
				test: /\.json$/,
				exclude:/node_modules/,
				loader:'json-loader'
			}
		]
	},
	plugins: [
	    new webpack.HotModuleReplacementPlugin()
  	]
}