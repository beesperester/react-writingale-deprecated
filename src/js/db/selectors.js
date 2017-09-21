// Schema
import { trees, tree, branches, branch } from './schema'

export function in_state(state, id) {
    return Object.keys(state).map(id => id.toString()).includes(id.toString())
}

/**
 * Select single tree object from store and denormalize.
 * 
 * @param {Object} state 
 * @param {Integer} id
 * 
 * @return {Object}
 */
export function selectTree(state, id) {
    if (!in_state(state.trees, id)) return {}

    const tree_state = Object.assign({}, state.trees[id])

    return Object.assign(tree_state, {
        branches: tree_state.branches.map(id => selectBranch(state, id))
    })

}

/**
 * Select all tree objects from store and denormalize.
 * 
 * @param {Object} state 
 * @param {Integer} id 
 * 
 * @return {Object}
 */
export function selectTrees(state) {
    return Object.keys(state.trees).map(id => selectTree(state, id))
}

/**
 * Select single branch object from store and denormalize.
 * 
 * @param {Object} state 
 * @param {Integer} id 
 * 
 * @return {Object}
 */
export function selectBranch(state, id) {
    if (!in_state(state.branches, id)) return {}

    const branch_state = Object.assign({}, state.branches[id])
    
    return Object.assign(branch_state, {
        branches: branch_state.branches.map(id => selectBranch(state, id))
    })
}

/**
 * Select all branch objects from store and denormalize.
 * 
 * @param {Object} state 
 * @param {Integer} id 
 * 
 * @return {Object}
 */
export function selectBranches(state) {
    return Object.keys(state.branches).map(id => selectBranch(state, id))
}