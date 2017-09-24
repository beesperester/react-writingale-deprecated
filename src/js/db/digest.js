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
    const state_digested = Object.keys(state).reduce((carry, state_name) => {
        let current_state = {
            normalized: {},
            overhead: {}
        }

        if (Object.keys(schema).includes(state_name)) {
            current_state.normalized = normalize(state[state_name], schema[state_name]).entities
        } else {
            // console.info('@db/digest/digestState.overhead', state[state_name])
            current_state.overhead[state_name] = state[state_name]
        }

        return merge.all([carry, current_state])
    }, {
        normalized: {},
        overhead: {}
    })

    console.info('@db/digest/digestState', state_digested)

    return state_digested
}