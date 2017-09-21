// Signals
import { signals } from 'signals'

// Utilities
import etherio, { endpoint } from 'libraries/etherio'

import { digestState } from 'digest'

/**
 * Create sibling for parent_id or tree_id with sorting. 
 * 
 * @param {Integer} parent_id 
 * @param {Integer} tree_id 
 * @param {Integer} sorting 
 */
export function createSibling(parent_id, tree_id, sorting) {
    const payload = {
        parent_id: parent_id,
        tree_id: tree_id,
        sorting: sorting
    }

    console.info('views/branch/actions/createSibling', payload)

    return etherio.post(endpoint('branch'), payload).then(data => {
        return {
            type: signals.STATE_UPSERT,
            data: digestState(data)
        }
    })
}

/**
 * Create descendant for id
 * 
 * @param {Integer} id 
 */
export function createDescendant(id) {
    return etherio.post(endpoint('branch'), {
        parent_id: id
    }).then(data => {
        return {
            type: signals.STATE_UPSERT,
            data: digestState(data)
        }
    })
}

/**
 * Create ancestor for id
 * 
 * @param {Integer} id 
 */
export function createAncestor(id, parent_id, tree_id) {
    const payload = {
        update_id: id,
        parent_id: parent_id,
        tree_id: tree_id
    }

    console.info('views/branch/actions/createAncestor', payload)

    return etherio.post(endpoint('branch'), payload).then(data => {
        return {
            type: signals.STATE_UPSERT,
            data: digestState(data)
        }
    })
}

/**
 * Delete branch by id
 * 
 * @param {Integer} id 
 */
export function deleteBranch(id) {
    return etherio.delete(endpoint(`branch/${id}`)).then(data => {
        return {
            type: signals.STATE_DELETE,
            data: digestState(data)
        }
    })
}