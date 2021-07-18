import { defineConfig } from "tampermonkey-cli"
export default defineConfig({
    headers: {
        match: "http://baidu.com"
    }
})