// Normalizr
import { normalize } from 'normalizr';

// Utilities
import { fetchEndpoint } from 'utilities/fetch'
import logging from 'utilities/logging'

// Reducers
import { actions } from 'reducers'

export default function connect(endpoint_name, schema = {}) {
    const endpoint = fetchEndpoint(endpoint_name)

    return {
        fetchAll: (dispatch) => {
            return endpoint.fetchAll((data) => {
                dispatch({
                    type: actions.UPDATE_ALL,
                    data: normalize(data, schema.list).entities
                })
            })
        },
        fetchOne: (dispatch, id) => {
            return endpoint.fetchOne(id, (data) => {
                dispatch({
                    type: actions.UPDATE_ALL,
                    data: normalize(data, schema.item).entities
                })
            })
        }
    }
}