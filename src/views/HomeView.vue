<template>
<div class="home">
    <ResumeComp msg="teste" />
    <TitulosShow msg="Esse é o novo componente" v-if="!$store.state.adicionandoTitulo" />
    <TituloForm msg="" v-if="$store.state.adicionandoTitulo" />
    <input type="button" value="Adicionar Título" @click="adicionarTitulo()">
    <input type="button" value="Voltar" @click="this.$store.state.adicionandoTitulo = false">

</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import TituloForm from '@/components/TituloForm.vue';
import TitulosShow from '@/components/TitulosShow.vue'
import ResumeComp from '@/components/Resume.vue';

import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080/api';

export default {
    name: 'HomeView',
    components: {
    ResumeComp,
    TitulosShow,
    TituloForm
},

    computed: {
        user() {
            return this.$store.state.user
        },

    },

    beforeMount() {
        console.log("Validar se está conectado no beforeMount()")

        // verifica se tem token no local storage e tenta acessar os dados da api
        /*if (localStorage.getItem("tokenGenerated")) {
            if (this.$store.state.userLogged.login != "") {
                this.$store.state.loggedIn = true
            }
            //this.$store.dispatch(
              //  'loadTokenLoaded',
                //JSON.parse(localStorage.getItem("tokenGenerated")))
            //this.$store.dispatch('loadDataFromAPI')
        }*/

        // verifica se tem token no local storage e tenta acessar os dados da api
        if (localStorage.getItem("tokenGenerated")) {
            var dado = JSON.parse(localStorage.getItem("tokenGenerated"))

            if (dado != "") {
                this.$store.commit('successLogin', dado)
                this.$store.state.loggedIn = true
            }
        }

        if (!this.$store.state.loggedIn) {
            this.$router.push('/login')
        } else {
            // this.carregarTitulos()
            this.$store.dispatch('loadDataFromAPI')
        }

    },

    methods: {
        adicionarTitulo() {
            this.$store.state.adicionandoTitulo = true
        }
    }

}
</script>
