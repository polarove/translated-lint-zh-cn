import { Config } from './types'
import {
	checkBody,
	checkBreakings,
	checkHeader,
	checkIssue
} from './supervisor'

export const processMsg = (msg: string, config: Config) => {
	const { header, body, breakings, issue } = stripper(msg)
	checkHeader(header, breakings, config.header, config.breakings)
	checkBody(body, config.body)
	checkBreakings(breakings, config.breakings)
	checkIssue(issue, config.issue)
}

const stripper = (pureMsg: string) => {
	let msgList = pureMsg.split('\n').filter((line) => line.trim().length > 0)
	const header = msgList[0] ? msgList[0] : ''
	const body = msgList[1] ? msgList[1] : ''
	const breakings = msgList[2] ? msgList[2] : ''
	const issue = msgList[3] ? msgList[3] : ''
	return { header, body, breakings, issue }
}
