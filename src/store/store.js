import { createStore } from 'vuex'
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

export const store = createStore({
    getters,
    mutations,
    state,
    actions,
    strict: process.env.NODE_ENV !== 'production'
})