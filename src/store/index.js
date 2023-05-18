import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: false,
    userLogged: {
      login: "",
      name: ""
    },
    token: "",
    titulos: [],
    adicionandoTitulo: false,
    centrosDeCustos: [],
    dashboard: [],
  },

  getters: {
  },

  mutations: {
    successLogin(state, dado) {
      console.log("Mutation SuccessLogin")
      console.log("State logado:" + state.loggedIn)
      console.log("dado passado: " + dado.toString())

      //Como foi sucesso logado tem que ser true e passar o login
      state.loggedIn = true
      state.userLogged.login = dado.usuario.email
      state.userLogged.name = dado.usuario.nome.split(" ")[0]
      state.token = dado.token

      console.log("Após logado---------")
      console.log("State logado: " + state.loggedIn)
      console.log("Nome do usuario: " + state.userLogged.name)
      console.log("Token Logado: " + state.token)
    },

    setUser() {
      console.log("Teste mutation " + this.state.loggedIn)

      //state.loggedIn = !state.loggedIn


      //console.log("Mutation setUserSendo Chamada: "+state.userLogged.login)
    },
    logout(state) {
      state.loggedIn = false
    },
    updateTitulos(state, dado) {
      console.log("titulos antes de atualizar: " + state.titulos)
      state.titulos = dado
      console.log("titulos depois de atualizar: " + state.titulos)
    },
    updateCentrosDeCustos(state, dado) {
      console.log("Centros de custos antes de atualizar: " + state.centrosDeCustos)
      state.centrosDeCustos = dado
      console.log("Centros de custos depois de atualizar: " + state.centrosDeCustos)
    },
    updateDashboard(state, dado) {
      console.log("Dashboard antes de atualizar: " + state.dashboard)
      state.dashboard = dado
      console.log("Dashboard depois de atualizar: " + state.centrosDeCustos)
    }
  },
  actions: {
    setUser({ commit }) {
      commit('setUser')
    },
    successLogin({ commit }, dado) {
      commit('successLogin', dado)
    },
    logout({ commit }) {
      commit('logout')
    },
    updateTitulos({ commit }, dado) {
      commit('updateTitulos', dado)
    },

    updateCentrosDeCustos({ commit }, dado) {
      commit('updateCentrosDeCustos', dado)
    },

    updateDashboard({ commit }, dado) {
      commit('updateDashboard', dado)
    }
  },
  modules: {
  },

  methods: {
    
  },
})
