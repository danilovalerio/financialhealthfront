<template>
    <AlertMessage />
<div>
    <section class="add-more">
        <form>
            <table class="tableform">
                <th colspan="2">
                    Adicionar Lançamento
                </th>
                <tr>
                    <td>
                        <label for="tipo">Tipo: </label>
                    </td>
                    <td class="info">
                        <select name="tipo" id="tipo" v-model="newTitle.tipo">
                            <option value="ARECEBER">Receita</option>
                            <option value="APAGAR">Despesa</option>
                        </select><br>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="fname">Descrição: </label>
                    </td>
                    <td class="info">
                        <input type="text" id="fname" name="fname" v-model="newTitle.descricao"><br>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="lname">Valor: </label>
                    </td>
                    <td class="info">
                        <input type="text" id="lname" name="lname" v-model="newTitle.valor"><br>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="centroDeCusto">Centro de custo: </label>
                    </td>
                    <td class="info">
                        <select name="id" id="id" v-model="newTitle.id">
                            <option v-for="(centro, index) in $store.state.centrosDeCustos" :key="index" :value="centro.id">{{centro.descricao}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="lname">Data vencimento: </label>
                    </td>
                    <td class="info">
                        <input type="text" id="datavencimento" name="dataVencimento" v-model="newTitle.dataVencimento"><br>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="inserir">
                        <input type="button" value="OK" @click="adicionarTitulo()">
                    </td>
                </tr>
            </table>
        </form>
    </section>
</div>
</template>

<script>

import AlertMessage from '@/components/AlertMessage.vue';

export default {
    name: 'TituloForm',
    components: {
        AlertMessage
    },
    props: {
        msg: String
    },
    data() {
        return {
            newTitle: {},
            newCentroDeCusto: {}
        }
    },
    methods: {
        adicionarTitulo() {
            this.newTitle.tipo,
            this.newTitle.valor,
            this.newTitle.dataVencimento
            var dadoNovo = {
                "id": this.newTitle.id
            }
            this.newTitle.centrosDeCustos = [dadoNovo]
            /*
            this.newTitle.descricao,
                    this.newTitle.valor,
                    this.newTitle.centrodecusto*/

            console.log("Adicionar " + JSON.stringify(this.newTitle))
            this.$store.dispatch('addTitulo', this.newTitle)
        }
    }
}
</script>

<style lang="scss">
//@import url('../styles/tabletitulos.scss');
@import '../styles/typography';

.recent-transaction {
    .line {
        width: 2px;
        height: 35px;
    }
}

form {
    text-align: right;
    background-color: white;
}

form input {
    text-align: start;
}

form select {
    height: 24px;
    width: 240px;
    box-sizing: border-box;
}

form label {
    font-size: 12px;
}

section.add-more {
    background-color: rgb(241, 241, 241);
    padding: 40px;
    margin-top: 40px;

    .tableform {
        background-color: aliceblue;
        border: 0px;
        border-color: white;
    }

    td {
        background-color: white;
        border-color: white;
        border-bottom-color: black;
        text-align: end;
        font-size: 30%;
        font-weight: bold;
    }

    .info {
        text-align: start;
    }

    input {
        text-align: start;
    }

    .inserir {
        text-align: center;
    }
}
</style>
