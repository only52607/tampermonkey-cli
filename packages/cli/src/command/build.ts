import { red, blue, green } from "chalk"
import { ConfigModules, getUserScriptCompiler, compileConfig } from "../util/compiler-builder"

async function compileUserScript(configModules: ConfigModules | undefined) {
    const compiler = getUserScriptCompiler(configModules)
    return new Promise<void>((resolve, reject) => {
        compiler.run((_err, stats) => {
            if (stats?.hasErrors()) {
                reject(stats)
            } else {
                resolve()
            }
        })
    })
}

export const build = async () => {
    console.log(blue("Start building userscript."))
    try {
        console.log(blue("Compiling config."))
        const compiledConfig = await compileConfig()
        console.log(blue("Compiling userscript."))
        await compileUserScript(compiledConfig)
        console.log(green("Build successfully."))
    } catch (stats) {
        console.log(stats.toString({colors: true}))
        console.log(red("Build failed."))
        return
    }
}