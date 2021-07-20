import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { join, resolve } from 'path';
import WebpackUserscript from 'webpack-userscript'


export default {
    entry: resolve(process.cwd(), 'src/index.ts'),
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: require.resolve("ts-loader"),
                        options: {
                            configFile: join(process.cwd(), './tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', 'tsx'],
    },
    output: {
        filename: 'index.js',
        path: resolve(process.cwd(), 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackUserscript(),
    ]
} as Configuration