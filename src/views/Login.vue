<template>
  <div class="home">
    <loader v-if="isLoading"/>
    <login-nav-bar />
    <login-box />
  </div>
</template>

<script>
import Loader from '@/components/general/Loader.vue'
import LoginNavBar from '@/components/login/LoginNavBar'
import LoginBox from '@/components/login/LoginBox'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  components: {
    Loader,
    LoginNavBar,
    LoginBox
  },
  computed: {
    ...mapState(['isLoading'])
  },
  created () {
    const loggedIn = this.$store.getters.loggedIn
    if (loggedIn) {
      this.$router.push('/home')
    } else {
      if (this.isLoading) {
        this.$store.dispatch('changeLoadingState')
      }
    }
  }
}
</script>
