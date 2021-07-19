import path from "path"
import { config, Configuration, webpack } from "webpack"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import WebpackUserscript, { WPUSOptions } from "webpack-userscript"
import fs from "fs"
import { merge } from "webpack-merge"

export interface ConfigModules {
    tampermonkey?: WPUSOptions,
    webpack?: Configuration
}

export function getConfigEntry():Configuration["entry"] {
    let tampermonkeyPath: string|undefined = path.resolve(process.cwd(), "tampermonkey.config.ts")
    if (!fs.existsSync(tampermonkeyPath)) tampermonkeyPath = path.resolve(process.cwd(), "tampermonkey.config.js")
    if (!fs.existsSync(tampermonkeyPath)) tampermonkeyPath = undefined
    let webpackPath: string|undefined = path.resolve(process.cwd(), "webpack.config.ts")
    if (!fs.existsSync(webpackPath)) webpackPath = path.resolve(process.cwd(), "webpack.config.js")
    if (!fs.existsSync(webpackPath)) webpackPath = undefined
    if (tampermonkeyPath && webpackPath) return { tampermonkey: tampermonkeyPath, webpack: webpackPath }
    else if (tampermonkeyPath) return { tampermonkey: tampermonkeyPath }
    else if (webpackPath) return { webpack: webpackPath }
    return undefined
}

export function getConfigModule() {
    const configModules:ConfigModules = {}
    if(fs.existsSync(path.resolve(process.cwd(), "dist-config/tampermonkey.config.js"))){
        configModules.tampermonkey = require(path.resolve(process.cwd(), "dist-config/tampermonkey.config.js")).default
    }
    if(fs.existsSync(path.resolve(process.cwd(), "dist-config/webpack.config.js"))){
        configModules.tampermonkey = require(path.resolve(process.cwd(), "dist-config/webpack.config.js")).default
    }
    return configModules
}

export async function compileConfig(): Promise<ConfigModules | undefined> {
    const config:Configuration = {}
    config.entry = getConfigEntry()
    if (!config.entry) return undefined
    config.mode = "production"
    config.output = {
        filename: '[name].config.js',
        path: path.resolve(process.cwd(), 'dist-config'),
        library: {
            type: "commonjs"
        }
    }
    config.module = {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: require.resolve("ts-loader"),
                        options: {
                            context: process.cwd(),
                            configFile: path.resolve(__dirname, '../../assets/config.tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    }
    config.plugins = [ new CleanWebpackPlugin() ]
    config.resolve = {
        extensions: ['.js', '.ts', 'tsx'],
    }
    return new Promise<ConfigModules>((resolve, reject) => {
        webpack(config, (_err, stats) => {
            if (stats?.hasErrors()) {
                reject(stats)
            } else {
                resolve(getConfigModule())
            }
        })
    })
}

export function getUserScriptCompiler(configModules: ConfigModules | undefined) {
    let config:Configuration = {}
    config.entry = path.resolve(process.cwd(), 'src/index.ts'),
    config.output = {
        filename: 'index.js',
        path: path.resolve(process.cwd(), 'dist')
    }
    config.mode = "production"
    config.output = {
        filename: 'index.js',
        path: path.resolve(process.cwd(), 'dist'),
    }
    config.module = {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: require.resolve("ts-loader"),
                        options: {
                            context: process.cwd(),
                            configFile: path.resolve(__dirname, '../../assets/userscript.tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    }
    config.resolve = {
        extensions: ['.js', '.ts', 'tsx'],
    }
    if (configModules?.tampermonkey) {
        config.plugins = [new CleanWebpackPlugin(), new WebpackUserscript(configModules.tampermonkey)]
    } else {
        config.plugins = [new CleanWebpackPlugin(), new WebpackUserscript()]
    }
    if (configModules?.webpack) {
        config = merge(config, configModules.webpack)
    }
    return webpack(config)
}