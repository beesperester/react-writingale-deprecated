// React
import React from 'react'

// React Router
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// Tree
import TreeIndex from 'views/tree/index'
import TreeShow from 'views/tree/show'

// Dashboard
import DashboardIndex from 'views/dashboard/index'

const Web = () => (
    <Router>

        <div>

            <Route exact path="/" component={DashboardIndex} />

            <Route path="/trees" component={TreeIndex} />

        </div>

    </Router>
)

export default Web