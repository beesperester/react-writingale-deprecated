// Redux-Orm
import { ORM } from 'redux-orm'
import Tree from 'models/tree'
import Branch from 'models/branch'

const _orm = new ORM()

_orm.register(Tree, Branch)

export default _orm