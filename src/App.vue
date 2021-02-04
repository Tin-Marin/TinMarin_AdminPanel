<template>
  <nav-bar></nav-bar>
  <login-box></login-box>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import LoginBox from './components/LoginBox.vue'

export default {
  components: {
    NavBar,
    LoginBox
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
