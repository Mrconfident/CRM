import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lead: {},
    agent: {},
    business: {}
  },
  mutations: {
    LEAD (state, lead) {
      state.lead = lead
    },
    AGENT (state, agent) {
      state.agent = agent
    },
    BUSINESS (state, business) {
      state.business = business
    }
  },
  getters: {
    getLead: state => {
      return state.lead
    },
    getAgent: state => {
      return state.agent
    },
    getBusiness: state => {
      return state.business
    }
  },
  actions: {
    fetchLead (context, lead) {
      context.commit('LEAD', lead)
    },
    fetchAgent (context, agent) {
      context.commit('AGENT', agent)
    }
  },
  modules: {
  }
})
