// Normalizr
import { normalize } from 'normalizr';

// Utilities
import { fetchEndpoint } from 'utilities/fetch'
import logging from 'utilities/logging'

// Schema
import { tree, trees } from 'schema'

const endpoints = fetchEndpoint('tree')

export default {
    fetchAll: (dispatch) => {
        return endpoints.fetchAll((data) => {
            dispatch({
                type: 'update_all',
                data: normalize(data, trees).entities
            })
        })
    },
    fetchOne: (dispatch, id) => {
        return endpoints.fetchOne(id, (data) => {
            dispatch({
                type: 'update_all',
                data: normalize(data, tree).entities
            })
        })
    }
}