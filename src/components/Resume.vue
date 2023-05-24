<template>
<div class="main">
    <div class="row">
        <div class="column-saldo">
            <div class="card">
                <h1 class="saldo">Saldo: R$ {{ tratarCasasDecimais($store.state.dashboard.saldo) }}</h1>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <p class="receber">Total a Receber: R$ {{ tratarCasasDecimais($store.state.dashboard.totalAreceber) }}</p>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <p class="pagar">Total a Pagar: R$ {{ tratarCasasDecimais($store.state.dashboard.totalApagar) }}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ResumeComp',
    props: {
        msg: String
    },
    methods: {
        tratarCasasDecimais(numero) {
            if (numero >= 0) {
                return numero.toFixed(2).replace(".",",")
            }
            return (0.00).toString().replace(".",",")
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/* On mouse-over, add a deeper shadow */
/* Add some padding inside the card container */

.container {
    padding: 2px 16px;
    margin: 0px;
}

h2 {
    color: rgb(0, 73, 182);
    margin: 0;
}

.receber {
    color: green;
    font-size: large;
    font-weight: bold;
}

.pagar {
    color: red;
    font-size: large;
    font-weight: bold;
}

.saldo {
    color: blue;
    padding: 20px;
}

/*Cards responsivos */
$font-family_1: Arial,
Helvetica,
sans-serif;
$background-color_1: #ffffff;

/* Float four columns side by side */
/* Remove extra left and right margins, due to padding in columns */
/* Clear floats after the columns */
/* Style the counter cards */
/* Responsive columns - one column layout (vertical) on small screens */
* {
    box-sizing: border-box;
    margin: 0px;
}

body {
    font-family: $font-family_1;
}

.column {
    float: left;
    width: 50%;
}

.row {
    margin: 0 -5px;

    &:after {
        content: "";
        display: table;
        clear: both;
    }
}

.main {
    border-radius: 25px;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 0px;
    text-align: center;
    background-color: $background-color_1;
    //background-color: brown;
    //border-radius: 5px;
}

@media screen and (max-width: 600px) {
    .column {
        width: 100%;
        display: block;
        margin-bottom: 0px;
    }
}
</style>
