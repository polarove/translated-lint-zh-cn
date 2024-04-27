export interface CliOptions {
    path?: string
    config?: string
}

export interface CommitType {
    description: string
    title: string
}

export interface DefaultTypes {
    [key: string]: CommitType
}

export interface Rule {
    header: Header
    body: Body
    breakings?: Breakings
    issue?: Issue
    ignored?: Ignored[]
}

export interface Ignored {
    rule: string
    flag?: string
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
    startsWith?: string[]
    prefix?: string
}
