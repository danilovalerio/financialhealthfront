<template>
<div>
    <div :class="this.$store.state.alertMessage.type" v-show="this.$store.state.alertMessage.show">
        <span class="closebtn" onclick="this.parentElement.style.display='none';" @click="this.$store.dispatch('alertMessage', [false, null, null])">&times;</span>
        {{ this.$store.state.alertMessage.message }}
    </div>

</div>
</template>

<script>
export default {
    name: 'AlertMessage',
    props: {
        msg: String
    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
$color_1: white;
$color_2: black;
$background-color_1: #f44336;
$background-color_2: #04AA6D;
$background-color_3: #2196F3;
$background-color_4: #ff9800;

.alert {
    padding: 20px;
    background-color: $background-color_1;
    color: $color_1;
    opacity: 1;
    transition: opacity 0.6s;
    margin-bottom: 15px;
    border-radius: 6px;
}

.alert.success {
    background-color: $background-color_2;
}

.alert.info {
    background-color: $background-color_3;
}

.alert.warning {
    background-color: $background-color_4;
}

.closebtn {
    margin-left: 15px;
    color: $color_1;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        color: $color_2;
    }
}
</style>
