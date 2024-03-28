// 默认配置从 @cz-translated-changelog/zh-cn 包获取

import { log } from 'console'
import { exit } from 'process'
import { parseLogMsg } from './informer'
import type { Config } from './types'

// 每次提交前都会重新生成一次
export const getDefaultConfig = async () => {
	let defaultTypes: string[] = []
	let maxSubjectWidth: number | null = null
	let maxBodyWidth: number | null = null
	// @ts-ignore
	await import('@cz-translated-changelog/zh-cn/src/options.json')
		.then((res) => {
			defaultTypes = Object.keys(res.types).map(
				(key) => res.types[key].title
			)
			maxSubjectWidth = res.maxHeaderWidth
			maxBodyWidth = res.maxLineWidth
		})
		.catch(() => {
			log(parseLogMsg('默认配置文件失效，请运行', '❓'))
			log(
				parseLogMsg(
					'npm i @cz-translated-changelog/zh-cn@latest -D',
					'❓'
				)
			)
			log(parseLogMsg('跳过本次检查...', '❓'))
			exit(0)
		})
	const defaultConfig = {
		header: {
			types: defaultTypes,
			scopes: [],
			subject: {
				maxWidth: maxSubjectWidth,
				required: true
			},
			excalmationMark: '!'
		},
		body: {
			maxWidth: maxBodyWidth
		},
		breakings: {
			startsWith: '破坏性更新'
		},
		issue: {
			startsWith: defaultTypes
		},
		ignored: [/^(v|merge|pull request)$/i]
	}
	return { defaultConfig }
}

export const getCustomConfig = async (
	customConfigs: Config,
	customConfigPath: string
) => {
	await import(customConfigPath)
		.then((res) => (customConfigs = res.default as Config))
		.catch(() => {})
	return { customConfigs }
}
