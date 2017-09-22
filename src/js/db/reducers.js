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
            if (action.data.trees) {
                return upsert(state, action.data.trees)
            }
        case signals.STATE_DELETE:
            if (action.data.trees) {
                return upsert(state, action.data.trees)
            }
    }

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
            if (action.data.branches) {
                return upsert(state, action.data.branches)
            }
        case signals.STATE_DELETE:
            if (action.data.branches) {
                return upsert(state, action.data.branches)
            }
    }

    return state
}

export const app_state = {
    active_branch_node: undefined
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
            if (action.data.branches && state.active_branch_node) {
                console.info('active branch')
                // we have updated branches and an active branch
                if (action.data.branches[state.active_branch_node.id]) {
                    console.info('update active branch')
                    // our active branch has been updated so it should be replaced in our app state
                    return upsert(state, {
                        active_branch_node: action.data.branches[state.active_branch_node.id]
                    })
                } else {
                    
                }
            }
        case signals.STATE_DELETE:
            if (action.data.branches && state.active_branch_node) {
                // we have updated branches and an active branch
                if (action.data.branches[state.active_branch_node.parent_id]) {
                    // our active branch has been deleted, set parent to active branch
                    return upsert(state, {
                        active_branch_node: action.data.branches[state.active_branch_node.parent_id]
                    })
                }
            }
        case signals.SELECT_BRANCH:
            return upsert(state, action.data)
    }

    return state
}

export const reducers = combineReducers({
    app,
    trees,
    branches
})