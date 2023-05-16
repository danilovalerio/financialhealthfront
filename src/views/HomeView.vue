<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  computed:{
      user(){ return this.$store.state.user },
    },

    beforeMount(){
      console.log("Validar se está conectado no beforeMount()")
    
      if(!this.$store.state.loggedIn)
        this.$router.push('/login')
    }
}
</script>
