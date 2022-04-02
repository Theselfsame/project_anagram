const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/js/landing.js'),
        play_page: path.resolve(__dirname, './src/js/play.js'),
        score_page: path.resolve(__dirname, './src/js/score.js'),
    },
    ///
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/pages/landing.html'), // шаблон
            filename: 'index.html', // название выходного файла
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pages/play.html'),
            filename: 'play.html',
            chunks: ['play_page']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pages/score.html'),
            filename: 'score.html',
            chunks: ['score_page']
        }),

        new CleanWebpackPlugin(),
    ],

    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'], //(если вы используете windows7, строку 'sass-loader' удалите.)
            },
            {
                test: /\.(html)$/,
                include: path.join(__dirname, 'src/views'),
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            }
        ]
    },


    mode: 'development',
    devServer: {
        historyApiFallback: true,
        //contentBase: path.resolve(__dirname, 'dist'),
        static: './dist',
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },

}