// import { Configuration } from 'webpack';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
// import { join, resolve } from 'path';
// const WebpackUserscript = require('webpack-userscript')

// const host = '127.0.0.1';
// const port = 8080;
// export default {
//   entry: './src/index.ts',
//   devtool: 'inline-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: [
//           {
//             loader: 'ts-loader',
//             options: {
//               configFile: join(__dirname, './src/tsconfig.json'),
//             },
//           },
//         ],
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.ts'],
//   },
//   externals: {},
//   output: {
//     filename: 'index.js',
//     path: resolve(__dirname, 'dist'),
//     publicPath: `http://${host}:${port}/`,
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new WebpackUserscript(),
//   ],
//   devServer: {
//     host,
//     port,
//     filename: 'index.js',
//     disableHostCheck: true,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': '*',
//     },
//   } as WebpackDevServerConfiguration,
// } as Configuration;

export default {}