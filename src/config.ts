// 默认配置从 @cz-translated-changelog/zh-cn 包获取
import { log } from 'console'
import { exit } from 'process'
import { parseLogMsg } from './informer'
import type { DefaultTypes, Rule } from './types'

// 每次提交前都会重新生成一次
export const getDefaultConfig = async () => {
    let defaultTypes: string[] = []
    let maxSubjectWidth: number | null = null
    let maxBodyWidth: number | null = null
    await import('@cz-translated-changelog/zh-cn/src/shared-config.json')
        .then((res) => {
            defaultTypes = Object.keys(res.types).map((key) => {
                const defaultType = res.types as DefaultTypes
                return defaultType[key].title
            })
            maxSubjectWidth = res.maxHeaderWidth
            maxBodyWidth = res.maxLineWidth
        })
        .catch(() => {
            log(parseLogMsg('默认配置文件失效，请运行', '⚠️'))
            log(
                parseLogMsg(
                    'npm i @cz-translated-changelog/zh-cn@latest -D',
                    '⚠️'
                )
            )
            log(parseLogMsg('或使用自定自定义配置文件', '⚠️'))
            log(parseLogMsg('跳过本次检查...', '⚠️'))
            exit(0)
        })
    const defaultConfig: Rule = {
        header: {
            types: defaultTypes,
            scopes: [],
            subject: {
                maxWidth: maxSubjectWidth,
                required: true,
            },
            excalmationMark: '!',
        },
        body: {
            maxWidth: maxBodyWidth,
        },
        breakings: {
            startsWith: '破坏性更新',
        },
        issue: {
            prefix: '#',
            startsWith: ['功能'],
        },
        ignored: [
            { rule: '^v|merge|pull request|revert', flag: 'i' },
            { rule: '^\\d+(\\.\\d+){0,2}(-)?.*$' },
        ],
    }
    return { defaultConfig }
}

export const getCustomConfig = async (
    customConfigs: Rule,
    customConfigPath: string
) => {
    await import(customConfigPath)
        .then((res) => (customConfigs = res.default as Rule))
        .catch((err: any) => {
            console.error(err)
            process.exit(1)
        })
    return { customConfigs }
}
