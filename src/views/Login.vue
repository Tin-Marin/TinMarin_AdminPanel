<template>
  <div class="home">
    <login-nav-bar />
    <login-box />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginNavBar from '@/components/login/LoginNavBar'
import LoginBox from '@/components/login/LoginBox'

export default {
  name: 'Login',
  components: {
    LoginNavBar,
    LoginBox
  },
  created () {
    const loggedIn = this.$store.getters.loggedIn
    if (loggedIn) {
      this.$router.push('/home')
    }
  }
}
</script>
