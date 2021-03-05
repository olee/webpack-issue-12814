const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolveDevtoolModuleFilename = (info) => {
    const absolutePath = path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
    if (!fs.existsSync(absolutePath)) {
        console.error(' MISS: ' + absolutePath);
        return null;
    } else {
        console.log('FOUND: ' + absolutePath);
    }
    return absolutePath;
};

module.exports = () => {
    return {
        target: 'web',
        mode: 'development',
        devtool: 'cheap-module-source-map',
        devServer: {
            port: 8080,
            compress: true,
            static: [path.resolve('./public')],
        },
        entry: [
            './src/index.js'
        ],
        output: {
            devtoolModuleFilenameTemplate: resolveDevtoolModuleFilename,
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: path.resolve('./public/index.html'),
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    loader: require.resolve('babel-loader'),
                    options: {
                    },
                },
            ]
        },
    }
};
