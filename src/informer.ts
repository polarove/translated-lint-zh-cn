#!/usr/bin/env node

const NAME = '@translated-lint/zh-cn'
export const parseLogMsg = (msg: string, affix?: any) => {
	const append = `[${NAME}]：`
	const affixs = affix ? affix : ''
	return append.concat(affixs).concat(msg)
}

export const handleBadCommit = (msg: string, affix?: any) => {
	console.error(parseLogMsg('未通过提交消息检查', '❗'))
	console.log(parseLogMsg(msg, affix))
}

export const hadnleQualifiedCommit = () => {
	console.log(parseLogMsg('提交消息通过检查！你真棒！', '❤ '))
}
