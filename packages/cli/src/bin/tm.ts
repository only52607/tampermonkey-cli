#!/usr/bin/env node

import { Command } from 'commander';
import { build } from '../command/build';
import { create } from '../command/create';
import { serve } from '../command/serve';
const program = new Command();

program
  .version(`tampermonkey-cli ${require('../../package').version}`)
  .usage('<command> [options]')

program.command("build")
    .description("build userscript for tamper monkey")
    .option("-i", "--install", false)
    .action(async (options) => {
        await build(options.install as boolean)
    })

program.command("create <dirName>")
    .description("create tampermonkey userscript project")
    .action(async (dirName: string) => {
        await create(dirName)
    })

program.command("serve")
    .description("serve tampermonkey userscript")
    .option('-h, --host <type>', 'set the specified host', '127.0.0.1')
    .option('-p, --port <type>', 'set the specified port', '8080')
    .action(async (options, command) => {
        await serve(options.host, parseInt(options.port))
    })

program.parse(process.argv)