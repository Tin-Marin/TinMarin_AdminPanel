<template>
  <div class="home">
    <login-nav-bar />
    <login-box />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginNavBar from '@/components/LoginNavBar'
import LoginBox from '@/components/LoginBox'

export default {
  name: 'Login',
  components: {
    LoginNavBar,
    LoginBox
  }
}
</script>
