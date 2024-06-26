import { Rule } from './src/types'

const types = ['功能']
const scopes = ['app', 'component', 'docs', 'style']
const ignored = [{ rule: '^v|merge|pull request|revert', flag: 'i' }]
const config: Rule = {
    header: {
        types: types,
        scopes: scopes,
        excalmationMark: '!',
        subject: {
            maxWidth: 100,
        },
    },
    body: {
        maxWidth: 100,
    },
    breakings: {
        startsWith: '破坏性更新',
        maxWidth: 100,
    },
    issue: {
        prefix: '#',
        startsWith: types,
    },
    ignored: ignored,
}

export default config
