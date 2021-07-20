import inquirer from "inquirer"
import path from "path"
import ejs from "ejs"
import fs from "fs"
import { green, red } from "chalk"

function ensureDirectoryExistence(filePath: string) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

async function getFiles(dir: string, prefix: string = ""): Promise<string |string[]> {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const nextDir = path.resolve(dir, dirent.name);
        const newPrefix = path.join(prefix, dirent.name)
        return dirent.isDirectory() ? getFiles(nextDir, newPrefix) : newPrefix;
    }));
    return Array.prototype.concat(...files);
}

export const create = async (dirName: string) => {
    const params = await inquirer.prompt([
        {
            name:'name',
            default: dirName,
            message:'脚本名称'
        },
        {
            name:'author',
            default:'anonymous',
            message:'作者'
        },
        {
            name:'version',
            default:'1.0.0',
            message:'版本号'
        },
        {
            name:'description',
            default:'',
            message:'描述'
        },
        {
            name:'homepage',
            default:'',
            message:'主页'
        },
        {
            name:'match',
            default:'*://*/*',
            message:'匹配网址（多个使用逗号分隔）'
        }
    ])
    params.dirName = dirName
    params.cliVersion = require("../../package").version
    params.namespace = `${params.homepage}#${dirName}`
    params.matches = "[" + (params.match as string).split(",").map(m => `"${m}"`).join(",") + "]"
    try {
        const templateDir = path.resolve(__dirname, '../../assets/template')
        const distDir = process.cwd()
        await fs.promises.mkdir(path.join(distDir, dirName))
        const templateFiles = await getFiles(templateDir) as string[]
        templateFiles.forEach((templateFileItem) => ensureDirectoryExistence(path.join(distDir, dirName, templateFileItem)))
        await Promise.all(templateFiles.map(async (templateFileItem) => {
            const fileRes:string = await ejs.renderFile(path.join(templateDir,templateFileItem), params)
            const filePath = path.join(distDir, dirName, templateFileItem)
            return fs.writeFileSync(filePath, fileRes)
        }))
    } catch(err) {
        console.error(err.stack)
        console.log(red("构建失败."))
        return 
    }
    console.log(green("构建完毕."))
}