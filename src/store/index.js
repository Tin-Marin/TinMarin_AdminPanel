import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    views: [
      {
        name: 'Education Areas',
        active: false
      },
      {
        name: 'Exhibition Rooms',
        active: false
      },
      {
        name: 'Exhibitions',
        active: false
      },
      {
        name: 'FAQ',
        active: false
      },
      {
        name: 'Recommendation',
        active: false
      },
      {
        name: 'Recommended Websites',
        active: false
      },
      {
        name: 'Suggestions',
        active: false
      },
      {
        name: 'Suggestion Types',
        active: false
      },
      {
        name: 'Quiz',
        active: false
      }
    ],
    token: localStorage.getItem('token') || null,
    isLoading: false
  },
  getters: {
    loggedIn (state) {
      return state.token !== null
    },
    getHeader (state) {
      return {
        Authorization: 'Bearer ' + state.token
      }
    },
    getLoadingState (state) {
      return state.isLoading
    }
  },
  mutations: {
    retrieveToken (state, token) {
      state.token = token
    },
    destroyToken (state) {
      state.token = null
    },
    changeLoadingState (state) {
      if (state.isLoading === true) state.isLoading = false
      else state.isLoading = true
    }
  },
  actions: {
    retrieveToken (context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', {
          username: credentials.username,
          password: credentials.password
        })
          .then(response => {
            const status = response.status
            const token = response.data.token
            if (token && status === 200) {
              localStorage.setItem('token', token)
              context.commit('retrieveToken', token)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken (context) {
      if (context.getters.loggedIn) {
        localStorage.removeItem('token')
        context.commit('destroyToken')
      }
    },
    changeLoadingState (context) {
      context.commit('changeLoadingState')
    }
  },
  modules: {
  }
})
