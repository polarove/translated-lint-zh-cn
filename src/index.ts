#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { Config } from './types'
import { exit } from 'process'
import { getDefaultConfig, getCustomConfig } from './config'
import { parseLogMsg, hadnleQualifiedCommit } from './informer'
import { processMsg } from './factory'
import { log } from 'console'

/**
 * 		 		   type scope subject
 *					👇  👇     👇
 * header      =>  提交(范围)!：标题
 *
 * body        =>  我不知道这个commit干啥了
 *
 * breakings   =>  破坏性更新：我去！
 *
 * issue 	   =>  修复 #245 #5236
 *
 */

const CONFIG = '--config'
const PATH = '--path'

/**
 * 处理传入的配置信息
 * config 指定的配置文件
 * path 指定提交信息的路径
 */
const configMap = new Map<string, string>()
process.argv.forEach((arg, index) => {
	if (arg === CONFIG) {
		configMap.set(CONFIG, process.argv[index + 1])
	} else if (arg === PATH) {
		configMap.set(PATH, process.argv[index + 1])
	}
})

const main = async () => {
	const tempfilePath = configMap.get(PATH)
	const customConfigPath = configMap.get(CONFIG)
	const { defaultConfig } = await getDefaultConfig()

	const { customConfigs } = await getCustomConfig(
		{} as Config,
		customConfigPath!
	)

	// 一般不会发生这个情况
	const noCommitEditMsgFileFound = () => {
		console.warn(
			parseLogMsg('未找到COMMIT_EDITMSG文件，跳过本次检查...', '❓')
		)
		exit(0)
	}

	if (!tempfilePath) noCommitEditMsgFileFound()
	const message = readFileSync(tempfilePath!, { encoding: 'utf-8' })
	writeFileSync('message.txt', message)
	if (customConfigPath) processMsg(message, customConfigs)
	else processMsg(message, defaultConfig)
	hadnleQualifiedCommit('提交消息通过检查！你真棒！')
}
main()
