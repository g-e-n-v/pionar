import axios from 'axios'
import caseConverter, { ApplyCaseMiddleware } from 'axios-case-converter'
import { get } from 'lodash-es'

const applyCaseMiddleware = get(caseConverter, 'default') as unknown as ApplyCaseMiddleware

export const api = applyCaseMiddleware(axios.create())
