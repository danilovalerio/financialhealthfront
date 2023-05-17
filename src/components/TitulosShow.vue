<template>
<div>
    <h1>Lançamentos</h1>
    <table>
        <tr>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Valor</th>
        </tr>
        <tr v-for="(titulo, index) in $store.state.titulos" :key="index">
            <td class="tipo">{{titulo.tipo}}</td>
            <td>{{titulo.descricao}}</td>
            <td class="valor">{{titulo.valor.toFixed(2)}}</td>
        </tr>
    </table>

</div>
</template>

<script>
export default {
    name: 'TitulosShow',
    props: {
        msg: String
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
