// Redux
import { combineReducers } from 'redux'


// Utilities
import logging from 'utilities/logging'

export const actions = {
    UPDATE_ALL: Symbol(),
    BRANCH_CREATED: Symbol,
}

export function generic(state = {}, action, collection) {
    switch (action.type) {
        case actions.UPDATE_ALL:
            let next_state = { ...state }

            if (action.data && action.data[collection]) {
                next_state = Object.assign({}, next_state, action.data[collection])
            }

            logging.info('reducers/generic', next_state)

            return next_state
        default:
            return state
    }
}

const trees_state = {}

export function trees(state = trees_state, action) {
    logging.info('reducers/trees', action)

    return generic(state, action, 'trees')
}

const branches_state = {}

export function branches(state = branches_state, action) {
    logging.info('reducers/branches', action)

    return generic(state, action, 'branches')
}

const _reducers = combineReducers({
    trees,
    branches,
})

export default _reducers