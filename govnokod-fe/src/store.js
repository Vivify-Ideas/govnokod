import Vue from 'vue'
import Vuex from 'vuex'

import { getAuthToken, setAuthToken } from './helpers'
import { apolloProvider } from './vue-apollo'

// graphql
import LOGIN_MUTATION from './graphql/login.gql'
import REGISTER_MUTATION from './graphql/register.gql'
import GET_PROFILE_QUERY from './graphql/get-profile.gql'

Vue.use(Vuex)
const token = getAuthToken()

const store = new Vuex.Store({
  state: {
    token,
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      setAuthToken(token)
      state.token = token
    }
  },
  actions: {
    register({ commit, dispatch }, data) {
      return apolloProvider.defaultClient.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          ...data
        }
      }).then(({ data }) => {
        commit('setToken', data.register.accessToken)
        return dispatch('getProfile')
      })
    },
    login({ commit, dispatch }, credentials) {
      return apolloProvider.defaultClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          ...credentials
        }
      }).then(({ data }) => {
        commit('setToken', data.login.accessToken)
        return dispatch('getProfile')
      })
    },
    getProfile({ commit }) {
      return apolloProvider.defaultClient.query({
        query: GET_PROFILE_QUERY
      }).then(({ data }) => {
        commit('setUser', data.getProfile)
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setUser', null)
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
})

if (token) {
  store.dispatch('getProfile')
}

export default store