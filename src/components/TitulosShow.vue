<template>
<div>
    <h1>Lançamentos</h1>
    <table>
        <tr>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
        </tr>
        <tr v-for="(titulo, index) in $store.state.titulos" :key="index">
            <td class="tipo">{{titulo.tipo}}</td>
            <td>{{titulo.descricao}}</td>
            <td class="valor">R$ {{titulo.valor.toFixed(2).replace(".",",")}}</td>
            <td class="valor">
            
            <button type="submit" @click="deletar(titulo.id)"><fa icon="remove"/></button>
            <button type="submit"><fa icon="edit"/></button>
            </td>
        </tr>
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

</style>
