import { defineConfig } from "tampermonkey-cli"

export default defineConfig({
    headers: {
        name: "测试脚本",     // 默认从package.json读取
        match: ["*://*/*"]
    }
})