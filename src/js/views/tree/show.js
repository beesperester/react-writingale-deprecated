// React
import React from 'react'

// Redux
import { connect } from 'react-redux'

// Utilities
import logging from 'utilities/logging'
import waitFor from 'utilities/waitfor'

import { treeSelector } from 'selectors'

// Branches
import BranchList from 'views/branch/list'

function mapStateToProps(state, props) {
    const id = parseInt(props.match.params.id)

    if (!state.Tree.items.includes(id)) return {}
    
    const next_state = {
        ...props,
       ...treeSelector(state, id)
    }

    return next_state
}

const Show = (props) => (
    <div>
        <h1>{props.name}</h1>

        <BranchList {...props} branches={props.branches} />
        
    </div>
)

export default connect(mapStateToProps)(waitFor('id', Show))