export const signals = {
    STATE_UPSERT: Symbol('state upsert'),
    STATE_DELETE: Symbol('state delete'),
    SELECT_BRANCH: Symbol('select branch')
}

export const relations = {
    CURRENT: Symbol('current'),
    ASCENDANT: Symbol('ascendant'),
    DESCENDANT: Symbol('descendant'),
    SIBLING: Symbol('sibling')
}

export default {
    signals
}