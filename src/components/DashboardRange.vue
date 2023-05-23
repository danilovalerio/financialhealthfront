<template>
<div class="main">
    <p>Selecione o período desejado para listar por data de vencimento:</p>
    <div class="row">
        <div class="column">
            <div class="card">
                <input type="button" class="rangeDashboard" value="7" @click="selecionarPeriodo(7)">
            </div>
        </div>
        <div class="column">
            <div class="card">
                <input type="button" class="rangeDashboard" value="15" @click="selecionarPeriodo(15)">
            </div>
        </div>
        <div class="column">
            <div class="card">
                <input type="button" class="rangeDashboard" value="30" @click="selecionarPeriodo(30)">
            </div>
        </div>
        <div class="column">
            <div class="card"><input type="button" class="rangeDashboard" value="60" @click="selecionarPeriodo(60)"></div>
        </div>
        <div class="column">
            <div class="card"><input type="button" class="rangeDashboard" value="90" @click="selecionarPeriodo(90)"></div>
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
            return 0.0
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
.card-cont {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 3%;
    transition: 0.3s;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
}

.container {

    width: 100%;
}

h3 {
    margin: 40px 0 0;
}

h2 {
    color: rgb(0, 73, 182);
    margin: 0;
}

p {
    color: blue;
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

.range {
    width: 100%;
    padding: 0px;
}

.rangeDashboard {
    background-color: #0a3144;
    border: none;
    color: white;
    padding: 15px 40px;
    width: 92%;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 12px;
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
}

body {
    font-family: $font-family_1;
}

.column {
    float: left;
    width: 20%;
}

.row {
    margin: 0 -5px;
    width: 100%;

    &:after {
        content: "";
        display: table;
        clear: both;
    }
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 0px;
    text-align: center;
    background-color: $background-color_1;
}

@media screen and (max-width: 600px) {
    .column {
        width: 100%;
        display: block;
        margin-bottom: 0px;
    }
}

/** BOTOES */
/* FORM TYPOGRAPHY*/

input[type=button],
input[type=submit],
input[type=reset] {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 8% 25%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 12px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

input[type=button]:hover,
input[type=submit]:hover,
input[type=reset]:hover {
    background-color: darkblue;
}

input[type=button]:active,
input[type=submit]:active,
input[type=reset]:active {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
}
</style>
