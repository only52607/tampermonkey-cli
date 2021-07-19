import WebpackDevServer from "webpack-dev-server"
import { blue, green, red } from "chalk";
import { compileConfig, getUserScriptCompiler } from "../util/compiler-builder";
import path from "path";

export const serve = async (host: string, port: number) => {
    console.log(blue("Start serving userscript."))
    try {
        console.log(blue("Compiling config."))
        const configModules = await compileConfig()
        console.log(blue("Compiling userscript."))
        const compiler = getUserScriptCompiler(configModules)
        const server = new WebpackDevServer(compiler as any, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            open: true,
            contentBase: path.resolve(process.cwd(), "dist"),
            openPage: `http://${host}:${port}/index.user.js`
        })
        server.listen(port, host, () => {
            console.log(green(`Starting server on http://${host}:${port}/index.user.js}`));
        })
    } catch (stats) {
        console.log(stats.toString({colors: true}))
        console.log(red("Run failed."))
        return
    }
}