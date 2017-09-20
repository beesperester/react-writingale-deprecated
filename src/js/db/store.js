// Redux
import { createStore, combineReducers } from 'redux'

import reducer from './reducer'

const _store = createStore(reducer)

export default _store