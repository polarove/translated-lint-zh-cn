const { copyFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const source = resolve(__dirname, '../src/types.d.ts')
const target = resolve(__dirname, '../lib/types.d.ts')
copyFileSync(source, target)

const date = new Date()
writeFileSync(
	resolve(__dirname, 'last-build'),
	date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
)
