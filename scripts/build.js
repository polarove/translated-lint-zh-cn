const { copyFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const source = resolve(__dirname, '../src/types.d.ts')
const target = resolve(__dirname, '../lib/types.d.ts')
copyFileSync(source, target)

writeFileSync(resolve(__dirname, 'last-build'), new Date().toLocaleTimeString())
