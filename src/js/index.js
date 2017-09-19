// React
import React from 'react'
import ReactDOM from 'react-dom'

// Redux
import { Provider } from 'react-redux'

// Router
import Router from 'router'

// Store
import store from 'store'

// Utilities
import cache from 'utilities/cache'
import fetch from 'utilities/fetch'
import logging from 'utilities/logging'

// override base url
fetch.config.base_url = 'http://ubuntu.local/api/v1.0/'

// disable cache
cache.config.enabled = false

import TreeActions from 'views/tree/actions'

TreeActions.fetchAll(store.dispatch)

ReactDOM.render(
    <Provider store={store}>
        
        <Router />
        
    </Provider>, 
    document.getElementById('mountpoint')
)