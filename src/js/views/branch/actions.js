// Signals
import { signals } from 'signals'

// Utilities
import etherio, { endpoint } from 'libraries/etherio'

import { digestState } from 'digest'

/**
 * Create sibling for branch. 
 * 
 * @param {Object} branch
 * 
 * @return {Promise}
 */
export function createSibling(branch) {
    const payload = {
        parent_id: branch.parent_id,
        tree_id: branch.tree_id,
        sorting: branch.sorting
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
 * Create next sibling for branch. 
 * 
 * @param {Object} branch
 * 
 * @return {Promise}
 */
export function createNextSibling(branch) {
    return createSibling(Object.assign(branch, {
        sorting: branch.sorting + 1
    }))
}

/**
 * Create descendant for branch. 
 * 
 * @param {Object} branch
 * 
 * @return {Promise}
 */
export function createDescendant(branch) {
    return etherio.post(endpoint('branch'), {
        parent_id: branch.id
    }).then(data => {
        return {
            type: signals.STATE_UPSERT,
            data: digestState(data)
        }
    })
}

/**
 * Create ancestor for branch. 
 * 
 * @param {Object} branch
 * 
 * @return {Promise}
 */
export function createAncestor(branch) {
    const payload = {
        update_id: branch.id,
        parent_id: branch.parent_id,
        tree_id: branch.tree_id
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
 * Delete branch. 
 * 
 * @param {Object} branch
 * 
 * @return {Promise}
 */
export function deleteBranch(branch) {
    return etherio.delete(endpoint(`branch/${branch.id}`)).then(data => {
        return {
            type: signals.STATE_DELETE,
            data: digestState(data)
        }
    })
}

/**
 * Select branch.
 * 
 * @param {Object} branch 
 */
export function selectBranch(branch) {
    return {
        type: signals.SELECT_BRANCH,
        data: {
            active_branch_node: Object.assign({}, branch)
        }
    }
}