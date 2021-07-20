import { defineConfig } from "tampermonkey-cli"

export default defineConfig({
    headers: {
        name: "<%= name %>",
        match: <%- matches %>,
        version: "<%= version %>",
        author: "<%= author %>",
        description: "<%= description %>",
        homepage: "<%= homepage %>",
        namespace: "<%= namespace %>"
    },
    pretty: true,
})