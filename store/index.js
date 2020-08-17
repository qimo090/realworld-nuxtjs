import cookieparser from 'cookieparser'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (e) {

      }
    }
    commit('setUser', user)
  },
}