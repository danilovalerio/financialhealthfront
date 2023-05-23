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
    filtroRangeDiasDashboard: 0
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
    },
    updateRangeDiasVencimentos(state, dado) {
      state.filtroRangeDiasDashboard = dado
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
    },
    updateDashboard({ commit }, diasDeResumo){
      console.log("Quantidade de dias:"+diasDeResumo)
      commit('updateRangeDiasVencimentos', diasDeResumo)

     // var inicio = '2023-05-01 00:00:00'
      //var termino = '2023-05-24 00:00:00'

      var formataDia = function(dia){
        if(dia > 9) {
          return dia
        } else {
          return "0"+dia
        }

      }

      //function adicionarDiasData(dias){
        var hoje        = new Date();
        var dataVenc    = new Date(hoje.getTime() + (diasDeResumo * 24 * 60 * 60 * 1000));
        var novaData = dataVenc.getDate() + "/" + (dataVenc.getMonth() + 1) + "/" + dataVenc.getFullYear();
        var inicioFormatado =  dataVenc.getFullYear()+"-"+formataDia(dataVenc.getMonth())+"-"+formataDia(dataVenc.getDate())+" "+"00:00:00"
        var terminoFormatado =  hoje.getFullYear()+"-"+formataDia(hoje.getMonth())+"-"+formataDia(hoje.getDate())+" "+"00:00:00"
      //}
       
    
      console.log("Inicio:"+dataVenc+"Término>"+hoje+" Nova data formatada"+novaData);
      console.log("Formatado Inicio:"+inicioFormatado+"   Término:"+terminoFormatado);

     
     // console.log(dataDeHora + " <--> " + dat)
      
      //atualizar dashboard
      axios.get('/dashboard', {
        headers: {
          //user: JSON.stringify(this.user),
          'Content-Type': 'application/json',
          'Authorization': `${this.state.token}`
        },
        params: {
          'periodoInicial': `${terminoFormatado}`,
          'periodoFinal': `${inicioFormatado}`
        },
      })
        .then(
          (result) => {
            console.log(result.data)
            commit('updateDashboard', result.data)
            console.log("Dashboard atualizado")
          }
        )
        .catch(
          error => {
            console.log(error.data)
          }
        )
    }
  },
  modules: {
  },

  methods: {
  },
})
