#!/usr/bin/env node

const NAME = '@translated-lint/zh-cn'
export const parseLogMsg = (msg: string, affix?: any) => {
	const append = `[${NAME}]：`
	const affixs = affix ? affix : ''
	return append.concat(affixs).concat(msg)
}

export const handleBadCommit = (msg: string, affix: string = '⚠️') => {
	console.error(parseLogMsg('未通过提交消息检查', affix))
	console.log(parseLogMsg(msg, affix))
}

export const hadnleQualifiedCommit = (msg: string, affix: string = '❤️') => {
	console.log(parseLogMsg(msg, affix))
}
