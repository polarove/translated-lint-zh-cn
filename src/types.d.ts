export interface Config {
	header: Header
	body: Body
	breakings?: Breakings
	issue?: Issue
}

interface _BasicConfig {
	maxWidth?: number | null
	required?: boolean
}

export interface Header {
	types?: string[]
	scopes?: string[]
	subject: _BasicConfig
	excalmationMark: string
}

export interface Body extends _BasicConfig {}

export interface Breakings extends _BasicConfig {
	startsWith?: string
}

export interface Issue extends _BasicConfig {
	startsWith?: string[] | string
	issuePrefix?: string
}
