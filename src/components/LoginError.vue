<template>
<div class="alert" v-if="this.$store.state.errorLogin.show">
    <span class="closebtn" onclick="this.parentElement.style.display='none';" 
    @click="this.$store.dispatch('errorLogin', [false, null])">&times;</span>
    {{ this.$store.state.errorLogin.message }}
</div>
</template>

<script>
export default {
    name: 'LoginError',
    props: {
        msg: String
    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/* MENSAGEM DE ALERTA */
/* The alert message box */
.alert {
    padding: 20px;
    background-color: #f44336;
    /* Red */
    color: white;
    margin-bottom: 15px;
    border-radius: 8px;
}

/* The close button */
.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
    color: black;
}
</style>
