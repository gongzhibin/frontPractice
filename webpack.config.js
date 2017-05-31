const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// var cssLoader = require('css-loader');
module.exports = {
    entry: path.resolve(__dirname, 'app/entry.js'),
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    plugins: [
       new UglifyJSPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
