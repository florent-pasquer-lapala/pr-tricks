const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = "../src/**/*";
var glob = require("glob");

module.exports = {
    entry: glob
        .sync(path.join(__dirname, srcDir + "*.ts"))
        .reduce(function (obj, el) {
            obj[path.parse(el).name] = el;
            return obj;
        }, {}),
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "initial",
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            indentedSyntax: true // optional
                        },
                        // Requires sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        },
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin({
            patterns: [{ from: ".", to: "./", context: "public" }],
            options: {},
        }),
    ],
};
