// Utilities
import connect from 'utilities/connect'
import logging from 'utilities/logging'

// Schema
import { tree, trees } from 'schema'

export default connect('tree', {
    item: tree,
    list: trees
})