<template>
<div class="home">

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

import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080/api';

export default {
    name: 'HomeView',
    components: {
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

        if (!this.$store.state.loggedIn) {
            this.$router.push('/login')
        } else {
            this.carregarTitulos()
        }

    },

    methods: {
        carregarTitulos() {
            console.log("Carregar titulos da api")
            //console.log("Token: "+this.token)

            //obter titulos
            axios.get('/titulos', {
                    headers: {
                        //user: JSON.stringify(this.user),
                        'Content-Type': 'application/json',
                        'Authorization': `${this.$store.state.token}`
                    }
                })
                .then(
                    (result) => {
                        console.log(result.data)
                        this.$store.commit('updateTitulos', result.data)
                        this.$store.commit('setUser', result.data[0])
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
                        'Authorization': `${this.$store.state.token}`
                    }
                })
                .then(
                    (result) => {
                        console.log(result.data)
                        this.$store.commit('updateCentrosDeCustos', result.data)
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
                        'Authorization': `${this.$store.state.token}`
                    },
                    params: {
                        'periodoInicial': '2023-05-01 00:00:00',
                        'periodoFinal': '2023-05-24 00:00:00'
                    },
                })
                .then(
                    (result) => {
                        console.log(result.data)
                        this.$store.commit('updateDashboard', result.data)
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

        adicionarTitulo() {
            this.$store.state.adicionandoTitulo = true
        }
    }

}
</script>
