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
            if (action.data.branches) {
                return upsert(state, action.data.branches)
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

export const reducers = combineReducers({
    trees,
    branches
})