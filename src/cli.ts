import { cac } from 'cac'
import { version } from '../package.json'
import { CliOptions, Rule } from './types'
import { parseLogMsg, hadnleQualifiedCommit } from './informer'
import { getCustomConfig } from './config'
import { readFileSync } from 'fs'
import { getDefaultConfig } from './config'
import { processMsg } from './factory'
import { PACKAGE_NAME } from './constant'

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

const cli = cac(PACKAGE_NAME)
cli.version(version)
    .option('--path <path>', '提交信息的文件路径')
    .option('--config <path>', '配置文件路径')
    .help()

cli.command('').action(async (args: CliOptions) => {
    if (typeof args.path !== 'string')
        return console.error(
            parseLogMsg('请通过 --path 参数指定提交信息文件的路径')
        )
    const message = readFileSync(args.path!, { encoding: 'utf-8' })
    if (typeof args.config === 'string') {
        const { customConfigs } = await getCustomConfig({} as Rule, args.config)
        processMsg(message, customConfigs)
    } else {
        const { defaultConfig } = await getDefaultConfig()
        processMsg(message, defaultConfig)
    }

    hadnleQualifiedCommit('提交消息通过检查！你真棒！')
})

cli.parse()
