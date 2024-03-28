#!/usr/bin/env node

import { Body, Breakings, Header, Ignored, Issue } from './types'
import { log } from 'console'
import { parseLogMsg, handleBadCommit, hadnleQualifiedCommit } from './informer'
import { exit } from 'process'
import { writeFileSync } from 'fs'

const checkWidth = (
	partName: string,
	part: string,
	maxWidth: number | null | undefined,
	exitCode: number
) => {
	if (maxWidth && part.length > maxWidth) {
		handleBadCommit(
			`${partName}已达${part.length}个字符，最多${maxWidth}个字符，请修改后再试`
		)
		exit(exitCode)
	}
}

const checkRequired = (
	partName: string,
	part: string,
	required: boolean | undefined,
	exitCode: number
) => {
	if (required && part && part.trim().length <= 0) {
		handleBadCommit(`${partName}不能为空`)
		exit(exitCode)
	}
}

const checkInclude = (
	partName: string,
	part: string | null | undefined,
	range: any[] | undefined,
	exitCode: number
) => {
	if (part && range && range.length > 0 && !range.includes(part)) {
		handleBadCommit(
			`${partName}必须是[${range.join(',')}]中的一个，请修改后重试。`
		)
		exit(exitCode)
	}
}

export const checkIgnore = (
	msg: string,
	ignoredCases: Ignored[] | undefined
) => {
	if (ignoredCases && ignoredCases.length > 0) {
		let shouldBeIgnored = null
		ignoredCases.every((reg: Ignored) => {
			shouldBeIgnored = new RegExp(reg.rule, reg.flag).test(msg)
		})
		if (shouldBeIgnored) {
			hadnleQualifiedCommit('根据给定规则，忽略本次检查')
			exit(0)
		}
	}
}

export const checkHeader = (
	header: string,
	breakings: string,
	headerRule: Header,
	breakingsRule: Breakings | undefined
) => {
	const w = header.split('：')
	if (w.length < 2) {
		handleBadCommit('标题应为👇，请确保使用中文冒号')
		log(parseLogMsg('类型(范围)：主题内容'))
		log(parseLogMsg('请修改后再试'))
		exit(100)
	}
	const hasScope = header.includes('(')

	const type = hasScope ? header.split('(')[0].trim() : w[0].trim()
	const scope = hasScope
		? header.match(/\(.+\)/)?.[0].replace(/[()]/g, '')
		: null
	const subject = w[1].trim()

	const checkType = (type: string) => {
		const typeRule = headerRule.types
		checkInclude('类型', type, typeRule, 101)
		return true
	}

	const checkScope = (scope: string | null | undefined) => {
		const scopeRule = headerRule.scopes
		checkInclude('范围', scope, scopeRule, 102)
		return true
	}

	const checkSubject = (subject: string) => {
		const subjectRule = headerRule.subject
		checkWidth('标题', subject, subjectRule.maxWidth, 103)
		checkRequired('标题', subject, subjectRule.required, 103)
		return true
	}

	const checkBreakingMark = () => {
		const breakingMark = headerRule.excalmationMark
		const breakingStartsWith = breakingsRule?.startsWith
		if (
			breakingMark &&
			breakingStartsWith &&
			breakings.substring(breakingStartsWith.length).trim().length > 0 &&
			!header.includes(breakingMark)
		) {
			handleBadCommit('本次更新为破坏性更新，但缺少相关标志👇')
			log(parseLogMsg(`破坏性更新所需标志：${breakingMark}`))
			log(parseLogMsg('请修改后再试'))
			exit(104)
		}
		return true
	}

	return {
		type: checkType(type),
		scope: checkScope(scope),
		subject: checkSubject(subject),
		breakingMark: checkBreakingMark()
	}
}

export const checkBody = (body: string, bodyRule: Body) => {
	checkWidth('详细说明', body, bodyRule.maxWidth, 201)
	checkRequired('详细说明', body, bodyRule.required, 202)
	return true
}

export const checkBreakings = (
	breakings: string,
	breakingsRule: Breakings | undefined
) => {
	if (breakingsRule) {
		checkWidth('破坏性更新', breakings, breakingsRule.maxWidth, 301)
		checkRequired('破坏性更新', breakings, breakingsRule.required, 302)
	}

	const breakingsShouldBeStartWith = breakingsRule?.startsWith
	if (
		breakings.length > 0 &&
		breakingsShouldBeStartWith &&
		!breakings.startsWith(breakingsShouldBeStartWith)
	) {
		handleBadCommit(`破坏性更新的详细说明应当以👇`)
		parseLogMsg(breakingsShouldBeStartWith)
		log(parseLogMsg(`开头，请修改后再试`))
		exit(303)
	}
	return true
}

export const checkIssue = (issue: string, issueRule: Issue | undefined) => {
	if (issueRule) {
		checkWidth('issue ', issue, issueRule.maxWidth, 401)
		checkRequired('issue ', issue, issueRule.required, 402)
	}
	// 好像不需要什么规则，以后再说
	const issueShouldBeStartWith = issueRule?.startsWith
	if (
		typeof issueShouldBeStartWith === 'string' &&
		issue &&
		issue.length > 0 &&
		!issue.startsWith(issueShouldBeStartWith)
	) {
		handleBadCommit(
			`issue 说明应当以${issueShouldBeStartWith}开头，请修改后再试`
		)
		exit(4)
	} else if (
		typeof issueShouldBeStartWith === 'object' &&
		issue &&
		issue.length > 0
	) {
		// 数组
		const result = issueShouldBeStartWith.find((prefix) =>
			issue.startsWith(prefix)
		)
		if (!result) {
			handleBadCommit(
				`issue 应当以[${issueShouldBeStartWith.join(
					'，'
				)}]中任意一个开头，请修改后再试`
			)
			exit(4)
		}
	}
	return true
}
