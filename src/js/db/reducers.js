// Deepmerge
import merge from 'deepmerge'

// Redux
import { combineReducers } from 'redux'

// Sinals
import { signals } from 'signals'

/**
 * Shallowly merges two states.
 * 
 * @param {Object} a 
 * @param {Object} b
 * 
 * @return {Object} 
 */
function upsert(a, b) {
    return merge.all([a ? a : {}, b], {
        arrayMerge: (destination, source) => source
    })
}

export const tree_state = {}

/**
 * Tree reducer.
 * 
 * @param {Object} state 
 * @param {Object} action 
 * 
 * @return {Object}
 */
export function trees(state = tree_state, action) {
    switch (action.type) {
        case signals.STATE_UPSERT:
            console.info('@db/reducers/trees.STATE_UPSERT', action)
            if (action.data.normalized.trees) {
                return upsert(state, action.data.normalized.trees)
            }
            break
        case signals.STATE_DELETE:
            console.info('@db/reducers/trees.STATE_DELETE', action)
            if (action.data.normalized.trees) {
                return upsert(state, action.data.normalized.trees)
            }
            break
    }

    console.info('@db/reducers/trees.DEFAULT', action)

    return state
}

export const branch_state = {}

/**
 * Branch reducer.
 * 
 * @param {Object} state 
 * @param {Object} action 
 * 
 * @return {Object}
 */
export function branches(state = branch_state, action) {
    switch (action.type) {
        case signals.STATE_UPSERT:
            console.info('@db/reducers/branches.STATE_UPSERT', action)
            if (action.data.normalized.branches) {
                return upsert(state, action.data.normalized.branches)
            }
            break
        case signals.STATE_DELETE:
            console.info('@db/reducers/branches.STATE_DELETE', action)
            if (action.data.normalized.branches) {
                return upsert(state, action.data.normalized.branches)
            }
            break
    }

    console.info('@db/reducers/branches.DEFAULT', action)

    return state
}

export const app_state = {
    active_branch: undefined
}

/**
 * App reducer.
 * 
 * @param {Object} state 
 * @param {Object} action 
 * 
 * @return {Object}
 */
export function app(state = app_state, action) {
    switch (action.type) {
        case signals.STATE_UPSERT:
            console.info('@db/reducers/app.STATE_UPSERT', action)
            if (action.data.overhead.created && action.data.overhead.created.branch) {
                // we created a new branch, which should be selected
                const id = action.data.overhead.created.branch.id

                if (action.data.normalized.branches && action.data.normalized.branches[id]) {
                    const active_branch = action.data.normalized.branches[id]

                    return upsert(state, {
                        active_branch: active_branch.id
                    })
                }
            }
            break
        case signals.STATE_DELETE:
            console.info('@db/reducers/app.STATE_DELETE', action)
            if (action.data.overhead.deleted && action.data.overhead.deleted.branch) {
                // we deleted a branch and should now select it's parent
                const parent_id = action.data.overhead.deleted.branch.parent_id

                if (action.data.normalized.branches && action.data.normalized.branches[parent_id]) {
                    const active_branch = action.data.normalized.branches[parent_id]

                    return upsert(state, {
                        active_branch: active_branch.id
                    })
                }
            }
            break
        case signals.SELECT_BRANCH:
            console.info('@db/reducers/app.SELECT_BRANCH', action)
            return upsert(state, {
                active_branch: action.data
            })
    }

    console.info('@db/reducers/app.DEFAULT', state)

    return state
}

export const reducers = combineReducers({
    app,
    trees,
    branches
})