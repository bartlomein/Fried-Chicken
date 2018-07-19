import Vue from 'vue'
import Vuex from 'vuex'




Vue.use(Vuex)
const state = {
    count: 0
}
export default new Vuex.Store({
    state,
    getters

})


const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}