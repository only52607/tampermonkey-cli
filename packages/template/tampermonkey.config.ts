import { defineConfig } from "tampermonkey-cli"

export default defineConfig({
    headers: {
        name: "脚本构建测试",
        match: ["*://fanyi.youdao.com/*"]
    }
})