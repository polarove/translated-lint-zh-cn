interface Ignored {
    rule: string;
    flag?: string;
}
interface _BasicConfig {
    maxWidth?: number | null;
    required?: boolean;
}
interface Header {
    types?: string[];
    scopes?: string[];
    subject: _BasicConfig;
    excalmationMark: string;
}
interface Body extends _BasicConfig {
}
interface Breakings extends _BasicConfig {
    startsWith?: string;
}
interface Issue extends _BasicConfig {
    startsWith?: string[];
    prefix?: string;
}

declare const checkIgnore: (msg: string, ignoredCases: Ignored[] | undefined) => void;
declare const checkHeader: (header: string, breakings: string, headerRule: Header, breakingsRule: Breakings | undefined) => {
    type: boolean;
    scope: boolean;
    subject: boolean;
    breakingMark: boolean;
};
declare const checkBody: (body: string, bodyRule: Body) => boolean;
declare const checkBreakings: (breakings: string, breakingsRule: Breakings | undefined) => boolean;
declare const checkIssue: (issue: string, issueRule: Issue | undefined) => boolean;

export { checkBody, checkBreakings, checkHeader, checkIgnore, checkIssue };
