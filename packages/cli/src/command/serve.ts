import WebpackDevServer from "webpack-dev-server"
import { blue } from "chalk";
import { buildCompiler } from "../util/compiler-builder";
import path from "path";

export const serve = () => {
    const host = '127.0.0.1';
    const port = 8080;
    const compiler = buildCompiler(process.cwd())
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
            console.log(blue(`Starting server on http://${host}:${port}/index.js}`));
        })
}