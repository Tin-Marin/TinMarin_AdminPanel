import { createStore } from 'vuex'

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
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
