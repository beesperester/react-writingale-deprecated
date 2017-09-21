// React
import React from 'react'

// Redux
import { connect } from 'react-redux'

// Utilities
import waitFor from 'components/waitfor'

import { selectTree } from 'db/selectors'

// Branches
import BranchList from 'views/branch/list'

function mapStateToProps(state, props) {
    const id = props.match.params.id
    
    const next_state = {
        ...props,
       ...selectTree(state, id)
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