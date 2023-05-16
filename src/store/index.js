import { createStore } from 'vuex'

export default createStore({
  state: {
    userLogged: {
      login: "",
      name: ""
    },
    loggedIn: false
  },
  getters: {
  },
  mutations: {
    successLogin(state, dado) {
      console.log("Mutation SuccessLogin")
      console.log("State logado:"+ state.loggedIn)
      console.log("dado passado: "+ dado.toString())

      //Como foi sucesso logado tem que ser true e passar o login
      state.loggedIn = true
      state.userLogged.login = dado.usuario.email
      state.userLogged.name = dado.usuario.nome.split(" ")[0]

      console.log("Após logado---------")
      console.log("State logado:"+ state.loggedIn)
      console.log("Nome do usuario:"+ state.userLogged.name)
    },

    setUser() {
      console.log("Teste mutation "+this.state.loggedIn)

      //state.loggedIn = !state.loggedIn

    
      //console.log("Mutation setUserSendo Chamada: "+state.userLogged.login)
    },
    logout(state){
      state.loggedIn = false
    }
  },
  actions: {
    setUser({ commit }) {
      commit('setUser')
    },
    successLogin( { commit }, dado) {
      commit('successLogin', dado)
    },
    logout({ commit} ) {
      commit('logout')
    }
  },
  modules: {
  },
  methods: {
    
  },
})
