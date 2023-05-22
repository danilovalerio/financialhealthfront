<template>
<div class="main">
    <div class="card">
        <div class="container">
            <p>Selecione o período desejado:</p>
            <input type="button" class="rangeDashboard" value="7" @click="selecionarPeriodo(7)">
            <input type="button" class="rangeDashboard" value="15" @click="selecionarPeriodo(15)">
            <input type="button" class="rangeDashboard" value="30" @click="selecionarPeriodo(30)">
            <input type="button" class="rangeDashboard" value="60" @click="selecionarPeriodo(60)">
            <input type="button" class="rangeDashboard" value="90" @click="selecionarPeriodo(90)">
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'DashboardRange',
    props: {
        msg: String
    },
    methods: {
        tratarCasasDecimais(numero) {
            if (numero >= 0) {
                return numero.toFixed(2)
            }
            return 0
        },

        selecionarPeriodo(dias) {
            this.$store.dispatch('updateDashboard', dias)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/* On mouse-over, add a deeper shadow */
/* Add some padding inside the card container */
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 3%;
    transition: 0.3s;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
}

.container {
    padding: 2px 16px;
}

h3 {
    margin: 40px 0 0;
}

h2 {
    color: rgb(0, 73, 182);
    margin: 0;
}

.receber {
    color: green;
}

.pagar {
    color: red;
}

.saldo {
    color: blue;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.rangeDashboard {
    background-color: #0a3144;
    border: none;
    color: white;
    padding: 15px 40px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}
</style>
