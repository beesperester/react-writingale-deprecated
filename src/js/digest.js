// Deepmerge
import merge from 'deepmerge'

// Normalizr
import { normalize } from 'normalizr'

// Schema
import schema from 'db/schema'

/**
 * Digest state object from backend and normalize.
 *  
 * @param {Object} state 
 * 
 * @return {Object}
 */
export function digestState(state) {
    const state_normalized = Object.keys(state).reduce((carry, state_name) => {
        if (!Object.keys(schema).includes(state_name)) return carry

        return merge.all([carry, normalize(state[state_name], schema[state_name])])
    }, {})

    return state_normalized.entities
}