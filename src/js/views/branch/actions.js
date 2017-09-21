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
    return etherio.post(endpoint('branch'), {
        parent_id: parent_id,
        tree_id: tree_id,
        sorting: sorting
    }).then(data => {
        return {
            type: signals.STATE_UPSERT,
            data: digestState(data)
        }
    })
}

/**
 * Create branch for parent_id
 * 
 * @param {Integer} parent_id 
 */
export function createBranch(parent_id) {
    return etherio.post(endpoint('branch'), {
        parent_id: parent_id
    }).then(data => {
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