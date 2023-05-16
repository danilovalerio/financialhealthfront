<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080/api';

export default {
    name: 'HomeView',
    components: {
        HelloWorld
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

            axios.get('/titulos', {
                    headers: {
                        //user: JSON.stringify(this.user),
                        'Content-Type':  'application/json',
                        'Authorization': `${this.$store.state.token}`
                    }
                })
                .then(
                    (result) => {
                        console.log(result.data)
                    }
                )
                .catch(
                    error => {
                        console.log(error.data)
                    }
                )
        }
    }

}
</script>
