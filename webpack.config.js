const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['./src/scripts/index.js'],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options:
                            {
                                name: '[name].[ext]'
                            }
                    },
                ],
            },
        ]
    }
};
