import { Configuration, webpack } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { join, resolve } from 'path';
import WebpackUserscript from 'webpack-userscript'

export function buildCompiler(cwd: string) {
    const host = '127.0.0.1';
    const port = 8080;
    const config: Configuration = {
        entry: resolve(cwd, 'src/index.ts'),
        devtool: 'inline-source-map',
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: join(cwd, './tsconfig.json'),
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.ts'],
        },
        externals: {},
        output: {
            filename: 'index.js',
            path: resolve(cwd, 'dist'),
            publicPath: `http://${host}:${port}/`,
        },
        plugins: [
            new CleanWebpackPlugin(),
            new WebpackUserscript(),
        ]
    }
    return webpack(config)
}