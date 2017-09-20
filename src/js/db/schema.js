// Normalizr
import { schema } from 'normalizr'

export const branch = new schema.Entity('branches')
export const branches = new schema.Array(branch)
export const tree = new schema.Entity('trees')
export const trees = new schema.Array(tree)

branch.define({
    tree: tree,
    parent: branch,
    branches: branches
})

tree.define({
    branches: branches
})

export default {
    branch,
    tree
}