// Normalizr
import { normalize } from 'normalizr'
import { trees } from 'db/schema'

// Signals
import { signals } from 'signals'

// Utilities
import etherio, {endpoint} from 'utilities/etherio'

export function createSibling(parent_id, tree_id, sorting) {
    return etherio.post(endpoint('branch'), {
        parent_id: parent_id,
        tree_id: tree_id,
        sorting: sorting
    }).then(data => {
        return {
            type: signals.UPSERT,
            data: normalize(data, trees).entities
        }
    })
}

export function createBranch(parent_id) {
    return etherio.post(endpoint('branch'), {
        parent_id: parent_id
    }).then(data => {
        return {
            type: signals.UPSERT,
            data: normalize(data, trees).entities
        }
    })
}