import { log } from 'console'

const g = new RegExp('^\\d+(\\.\\d+){0,2}(-)?.*$')

log(g.test('0.0.15'))
