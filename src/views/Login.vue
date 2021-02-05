<template>
  <div class="home">
    <nav-bar />
    <login-box />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import LoginBox from '@/components/LoginBox'

export default {
  name: 'Login',
  components: {
    NavBar,
    LoginBox
  }
}
</script>
