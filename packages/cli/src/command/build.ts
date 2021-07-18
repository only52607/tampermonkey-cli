import { red, green, blue } from "chalk"
import { buildCompiler } from "../util/compiler-builder"

export const build = () => {
    console.log(blue("Start building userscript."))
    const compiler = buildCompiler(process.cwd())
    compiler.run((_err, stats) => {
        let failed = false
        if (stats?.hasErrors()) {
            console.log(stats.toString({
                colors: true,
              }))
              failed = true
            console.log(red("Build failed."))
        }
        compiler.close(()=>{
            if (!failed) console.log(green("Build successfully."))
        });
    })
}