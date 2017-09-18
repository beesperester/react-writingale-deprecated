const env = process.env.NODE_ENV || 'production'

export function info() {
    if (env == 'development') console.info.apply(this, Array.prototype.slice.call(arguments))
}

export function log() {
    if (env == 'development') console.log.apply(this, Array.prototype.slice.call(arguments))
}

export function warn() {
    if (env == 'development') console.warn.apply(this, Array.prototype.slice.call(arguments))
}

export function error() {
    if (env == 'development') console.error.apply(this, Array.prototype.slice.call(arguments))
}

export default {
    info,
    log,
    warn,
    error
}