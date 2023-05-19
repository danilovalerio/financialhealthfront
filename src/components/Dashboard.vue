<template>
<div class="main">
    <div class="card">
        <div class="container">
            <h1 class="saldo">Saldo: R$ {{ tratarCasasDecimais($store.state.dashboard.saldo) }}</h1>
            <p class="receber">Total a Receber: R$ {{ tratarCasasDecimais($store.state.dashboard.totalAreceber) }}</p>
            <p class="pagar">Total a Pagar: R$ {{ tratarCasasDecimais($store.state.dashboard.totalApagar) }}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'DashboardComp',
    props: {
        msg: String
    },
    methods: {
        tratarCasasDecimais(numero) {
            if (numero >= 0) {
                return numero.toFixed(2)
            }
            return 0
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
</style>
