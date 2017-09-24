import { is_empty } from 'helpers/object'

export class InQueueException extends Error {}

export function objectToQueryParams(obj) {
    return Object.keys(obj).reduce((a, b) => {
        return a + b + '=' + encodeURIComponent(obj[b])
    }, '?')
}

export function endpoint(endpoint) {
    return _etherio.prefixUrl(endpoint)
}

export class EtherIO
{
    constructor(config = {}) {
        const default_config = {
            base_url: '',
            queue: true,
            headers: {}
        }

        this.config = Object.assign({}, default_config, config)
        this.queue = []
    }

    /**
     * Make a request to url with payload and return promise.
     * 
     * @param {URL} url 
     * @param {Object} payload 
     * @param {Object} config
     *  
     * @return {Promise}
     */
    request(url, payload = {}, config = {}) {
        const payload_serialized = JSON.stringify(payload)
        const default_headers = {
            'Content-Length': payload_serialized.length.toString()
        }
        const default_config = {
            method: 'GET',
            headers: Object.assign(default_headers, this.config.headers)
        }
        config = Object.assign({}, default_config, config)

        // add payload to config for post and put requests
        if (['POST', 'PUT'].includes(config.method)) {
            config.body = payload_serialized
            config.headers = Object.assign(config.headers, {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }

        console.info('@libraries/etherio/EtherIO.request', config)

        // check if url already requested, return queued promise
        const promise_index = this.queue.map(promise => promise.url).indexOf(url.toString)

        if (this.config.queue && promise_index >= 0) return this.queue[promise_index]
        
        const promise = fetch(new Request(url, config))

        // push promise to queue
        this.queue.push({
            url: url.toString(),
            promise: promise
        })
        
        return promise.then((response) => {
            // remove promise from queue
            const promise_index = this.queue.map(promise => promise.url).indexOf(url.toString())

            if (promise_index >= 0) {
                this.queue.splice(promise_index, 1)
            }

            // return successfull promise
            if (response.ok) return response

            // reject promise if error
            return Promise.reject(Error(response.statusText))
        })
        .then(response => response.json())
    }

    /**
     * Make get request to url with payload.
     * 
     * @param {URL} url 
     * @param {Object} payload 
     * 
     * @return {Promise}
     */
    get(url, payload = {}) {
        url = new URL(!is_empty(payload) ? objectToQueryParams(payload) : '', url)
        
        return this.request(url)
    }

    /**
     * Make post request to url with payload.
     * 
     * @param {URL} url 
     * @param {Object} payload 
     * 
     * @return {Promise}
     */
    post(url, payload = {}) {
        return this.request(url, payload, {
            method: 'POST'
        })
    }

    /**
     * Make put request to url with payload.
     * 
     * @param {URL} url 
     * @param {Object} payload 
     * 
     * @return {Promise}
     */
    put(url, payload = {}) {
        return this.request(url, payload, {
            method: 'PUT'
        })
    }

    /**
     * Make delete request to url with payload.
     * 
     * @param {URL} url 
     * @param {Object} payload 
     * 
     * @return {Promise}
     */
    delete(url, payload = {}) {
        url = new URL(!is_empty(payload) ? objectToQueryParams(payload) : '', url)

        return this.request(url, {}, {
            method: 'DELETE'
        })
    }

    /**
     * Prefix url with base url from config.
     * 
     * @param {String} url
     * 
     * @return {URL}
     */
    prefixUrl(url) {
        return new URL(url, this.config.base_url)
    }
}

const _etherio = new EtherIO()

export default _etherio