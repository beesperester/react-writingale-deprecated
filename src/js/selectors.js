// Redux-Orm
import { createSelector } from 'redux-orm'

import orm from 'db/orm'

export const treeSelector = (state, id) => {
    return createSelector(orm, session => {
        const tree = session.Tree.withId(id).ref

        return Object.assign({}, tree, {
            branches: tree.branches.map(id => branchSelector(state, id))
        })
    })(state)
}

export const branchSelector = (state, id) => {
    return createSelector(orm, session => {
        const branch = session.Branch.withId(id).ref
        
        return Object.assign({}, branch, {
            branches: branch.branches.map(id => branchSelector(state, id))
        })
    })(state)
}

export const treesSelector = createSelector(orm, session => {
    return session.Tree.all().toModelArray()
})

export const branchesSelector = createSelector(orm, session => {
    return session.Branch.all().toModelArray()
})