import { Config } from './src/types'

const types = ['功能']
const scopes = ['app', 'component', 'docs', 'style']
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
	}
}

export default config
