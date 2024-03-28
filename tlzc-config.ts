import { Config } from './src/types'

const types = ['功能']
const scopes = ['app', 'component', 'docs', 'style']
const ignored = [/^(v|merge|pull request)$/i]
const config: Config = {
	header: {
		types: types,
		scopes: scopes,
		excalmationMark: '!',
		subject: {
			maxWidth: 100
		}
	},
	body: {
		maxWidth: 100
	},
	breakings: {
		startsWith: '破坏性更新',
		maxWidth: 100
	},
	issue: {
		issuePrefix: '#',
		startsWith: types
	},
	ignored: ignored
}

export default config
