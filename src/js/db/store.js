// Redux
import { createStore } from 'redux'

import { reducers } from './reducers'

const _store = createStore(reducers)

export default _store