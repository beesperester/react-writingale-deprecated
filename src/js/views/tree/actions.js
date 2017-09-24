// Signals
import { signals } from 'signals'

// Utilities
import etherio, { endpoint } from 'libraries/etherio'

import { digestState } from 'db/digest'

/**
 * Create sibling for parent_id or tree_id with sorting. 
 * 
 * @param {Integer} parent_id 
 * @param {Integer} tree_id 
 * @param {Integer} sorting 
 */
export function createBranch(id) {
    const payload = {
        tree_id: id
    }

    console.info('views/tree/actions/createBranch', payload)

    return etherio.post(endpoint('branch'), payload).then(data => {
        return {
            type: signals.STATE_UPSERT,
            data: digestState(data)
        }
    })
}