import { createStore } from 'vuex'
import axios from 'axios'


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


      state.userLogged.token = dado.token
      localStorage.setItem("tokenGenerated", JSON.stringify(dado))

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
      state.userLogged.token = ""
      localStorage.setItem("tokenGenerated", JSON.stringify(""))
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
    },
    updateToken(state, dado) {
      console.log("Token Storage Load", dado)
      state.userLogged.token = dado
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

    //carregar dados da API
    loadDataFromAPI({ commit }) {
      console.log("Load data from API chamado com toke "+ this.state.token)
      //obter titulos
      axios.get('/titulos', {
        headers: {
          //user: JSON.stringify(this.user),
          'Content-Type': 'application/json',
          'Authorization': `${this.state.token}`
        }
      })
        .then(
          (result) => {
            console.log(result.data)
            commit('updateTitulos', result.data)
            commit('setUser', result.data[0])
          }
        )
        .catch(
          error => {
            console.log(error.data)
          }
        )

      //obter centros de custo
      axios.get('/centrosdecusto', {
        headers: {
          //user: JSON.stringify(this.user),
          'Content-Type': 'application/json',
          'Authorization': `${this.state.token}`
        }
      })
        .then(
          (result) => {
            console.log(result.data)
            commit('updateCentrosDeCustos', result.data)
            //this.$store.commit('updateTitulos', result.data)
            //this.$store.commit('setUser', result.data[0])
          }
        )
        .catch(
          error => {
            console.log(error.data)
          }
        )

      //obter dashboard
      axios.get('/dashboard', {
        headers: {
          //user: JSON.stringify(this.user),
          'Content-Type': 'application/json',
          'Authorization': `${this.state.token}`
        },
        params: {
          'periodoInicial': '2023-05-01 00:00:00',
          'periodoFinal': '2023-05-24 00:00:00'
        },
      })
        .then(
          (result) => {
            console.log(result.data)
            commit('updateDashboard', result.data)
            //this.$store.commit('updateTitulos', result.data)
            //this.$store.commit('setUser', result.data[0])
          }
        )
        .catch(
          error => {
            console.log(error.data)
          }
        )
    },
    loadTokenLoaded( { commit }, dado) {
      commit('updateToken', dado)
    }
  },
  modules: {
  },

  methods: {

  },
})
