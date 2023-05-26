<template>
<div class="home">
    <ResumeComp msg="teste" class="dash"/>
    <DashboardRange class="range" />
    <LoginError/>
</div>
<div class="vencimentos">
    <h2>Vencimentos dos últimos {{ this.$store.state.filtroRangeDiasDashboard }} dias</h2>
    <table>
        <tr>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Vencimento</th>
            <th>Valor</th>
        </tr>
        <tr v-for="(titulo, index) in $store.state.dashboard.titulosAreceber" :key="index">
            <td class="tipo">{{titulo.tipo}}</td>
            <td>{{titulo.descricao}}</td>
            <td class="vencimento">{{titulo.dataVencimento}}</td>
            <td class="valor">R$ {{titulo.valor.toFixed(2).replace(".",",")}}</td>
        </tr>
        <tr v-for="(titulo, index) in $store.state.dashboard.titulosApagar" :key="index">
            <td class="tipo">{{titulo.tipo}}</td>
            <td>{{titulo.descricao}}</td>
            <td class="vencimento">{{titulo.dataVencimento}}</td>
            <td class="valor">R$ {{titulo.valor.toFixed(2).replace(".",",")}}</td>
        </tr>
    </table>

</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
//import TituloForm from '@/components/TituloForm.vue';
//import TitulosShow from '@/components/TitulosShow.vue'
//import Dashboard from '@/components/Dashboard.vue';
import DashboardRange from '@/components/DashboardRange.vue';
import ResumeComp from '@/components/Resume.vue'
import LoginError from '@/components/LoginError.vue';

import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080/api';

export default {
    name: 'VencimentosView',
    components: {
        DashboardRange,
        ResumeComp,
        LoginError
    },

    computed: {
        user() {
            return this.$store.state.user
        },
    },

    created() {
        console.log(
            "TRATAR PARA CHAMAR SOMENTE QUANDO MUDAR \nCarrega vencimentos " +this.$store.state.filtroRangeDiasDashboard
            )
        if(this.$store.state.filtroRangeDiasDashboard == 0) {
            this.$store.dispatch('updateDashboard', 30)
        } else {
            this.$store.dispatch('updateDashboard', this.$store.state.filtroRangeDiasDashboard)
        }        
    },

    methods: {
        adicionarTitulo() {
            this.$store.state.adicionandoTitulo = true
        },
    }

}
</script>

<style lang="scss" scoped>
/** Novo Layout para a página ficar responsiva */
$font-family_1: Arial, Helvetica, sans-serif;
$background-color_1: #f1f1f1;

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
	width: 25%;
	padding: 0 10px;
}

.vencimentos {
    margin: 4px;
}

.dash {
    margin: 0px;
}

.row {
	margin: 0 -5px;
	&:after {
		content: "";
		display: table;
		clear: both;
	}
}
.card {
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 16px;
	text-align: center;
	background-color: $background-color_1;
}

@media screen and (max-width: 600px) {
	.column {
		width: 100%;
		display: block;
		margin-bottom: 20px;
	}
}



.home {
    font-size: 12px;
}

/* On mouse-over, add a deeper shadow */
/* Add some padding inside the card container */
.dash{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 3%;
    transition: 0.3s;
    margin: 4px;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
}

.range {
    background-color: #ffffff;
    border: none;
    color: white;
    padding: 15px 12px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 12px;
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

a:active {
    color: aqua;
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

