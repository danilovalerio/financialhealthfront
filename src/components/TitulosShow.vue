<template>
<div class="divlancamentos">
    <h1>Lançamentos</h1>
    <table class="fixed_headers">
    <thead>
        <tr>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(titulo, index) in $store.state.titulos" :key="index">
            <td class="tipo">{{titulo.tipo}}</td>
            <td>{{titulo.descricao}}</td>
            <td class="valor">R$ {{titulo.valor.toFixed(2).replace(".",",")}}</td>
            <td class="valor">
            
            <button type="submit" @click="deletar(titulo.id)"><fa icon="remove"/></button>
            <button type="submit"><fa icon="edit"/></button>
            </td>
        </tr>
    </tbody>
    </table>

</div>
</template>

<script>
export default {
    name: 'TitulosShow',
    props: {
        msg: String
    },
    methods: {
        deletar(id){
            console.log("Id para deletar: "+ id)
            this.$store.dispatch('deletarTitulo', id)
        }
    }
}
</script>

<style lang="scss">
//@import url('../styles/tabletitulos.scss');
@import '../styles/tabletitulos';
@import '../styles/typography';

.recent-transaction {
    .line {
        width: 2px;
        height: 35px;
    }
}


$color_1: #fdfdfd;
$background-color_1: #333333;
$background-color_2: #dddddd;

.fixed_headers {
    overflow-y: auto;
	table-layout: fixed;
	border-collapse: collapse;
	th {
		text-decoration: underline;
		padding: 5px;
		text-align: left;
		&:nth-child(1) {
			min-width: 200px;
		}
		&:nth-child(2) {
			min-width: 200px;
		}
		&:nth-child(3) {
			width: 350px;
		}
        &:nth-child(4) {
			width: 200px;
            text-align: center;
		}
	}
	td {
		padding: 5px;
		text-align: left;
		&:nth-child(1) {
			min-width: 200px;
		}
		&:nth-child(2) {
			min-width: 200px;
		}
		&:nth-child(3) {
			width: 350px;
		}
        &:nth-child(4) {
			width: 200px;
            text-align: center;
		}
	}
	thead {
		background-color: $background-color_1;
		color: $color_1;
		tr {
			display: block;
			position: relative;
		}
	}
	tbody {
		display: block;
		overflow: auto;
		width: 100%;
		height: 200px;
		tr {
			&:nth-child(even) {
				background-color: $background-color_2;
			}
		}
	}
}
.old_ie_wrapper {
	height: 300px;
	width: 750px;
	overflow-x: hidden;
	overflow-y: auto;
	tbody {
		height: auto;
	}
}

.divlancamentos {
	background-color: white;
			
}
</style>
