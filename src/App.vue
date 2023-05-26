<template>
<nav v-if="this.$store.state.loggedIn">
    <router-link to="/">Home</router-link>
    <router-link to="/vencimentos">Vencimentos</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/login" v-if="!this.$store.state.loggedIn">Login</router-link>
    <router-link to="/login" @click="this.$store.dispatch('logout')" v-else> Logout</router-link>
</nav>
<router-view class="views" />
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

}

$color_1: #f2f2f2;
$background-color_1: #333;

/* Style the navbar */
/* Navbar links */
/* Page content */
/* The sticky class is added to the navbar with JS when it reaches its scroll position */
/* Add some top padding to the page content to prevent sudden quick movement (as the navigation bar gets a new position at the top of the page (position:fixed and top:0) */
nav {
    position: fixed;
    width: 100vw;
    left: 0;
    top: 0;
    z-index: 200;
    height: 6%;

    overflow: hidden;
    background-color: $background-color_1;

    a {
        float: left;
        display: block;
        color: $color_1;
        text-align: center;
        padding: 14px;
        text-decoration: none;
        align-items: center;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.views {
    padding-top: 16px;
}

.sticky {
    position: fixed;
    top: 0;

   
}

.views {
    margin-top: 6%;
}
</style>
