#!/usr/bin/env node

import { Command } from 'commander';
import { build } from '../command/build';
import { create } from '../command/create';
import { serve } from '../command/serve';
const program = new Command();

program
  .version(`tampermonkey-cli ${require('../package').version}`)
  .usage('<command> [options]')

program.command("build")
    .description("build userscript for tamper monkey")
    .action(()=>{
        build()
    })

program.command("create")
    .description("create tampermonkey userscript project")
    .action(()=>{
        create()
    })

program.command("serve")
    .description("serve tampermonkey userscript")
    .action(()=>{
        serve()
    })

program.parse(process.argv)