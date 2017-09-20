// Redux-Orm
import { createReducer } from 'redux-orm'
import orm from './orm'

const _reducer = createReducer(orm)

export default _reducer