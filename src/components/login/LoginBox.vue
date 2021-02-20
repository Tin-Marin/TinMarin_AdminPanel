<template>
  <div class="container grey lighten-3 z-depth-2"
    style="margin-top: 5%; padding-top: 25px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px">
    <div class="row">
      <form @submit.prevent="login">
        <div class="col s12 center-align">
          <img src="../../assets/logo-tm-transparente.png" />
        </div>
        <div class="col s12 input-field">
          <input type="text" class="validate" id="username" v-model="username" autocomplete="off" required>
          <label for="username">Usuario</label>
        </div>
        <div class="col s12 input-field">
          <input type="password" class="validate" id="password" v-model="password" autocomplete="off" required>
          <label for="password">Contraseña</label>
        </div>
        <div class="col s12" v-if="!validCredentials">
          <p class="red-text">{{ message }}</p>
        </div>
        <div class="col s12 center-align">
          <button type="submit" class="btn blue darken-2 waves-effect" @click="login">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  template: 'loginbox',
  data () {
    return {
      username: '',
      password: '',
      validCredentials: true,
      message: '',
      isLoading: false
    }
  },
  methods: {
    async login () {
      this.$store.dispatch('changeLoadingState')
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.validCredentials = true
          this.message = ''
          this.$router.push('/home')
        })
        .catch(() => {
          this.validCredentials = false
          this.message = 'Username does not match with specified password'
        })
        .finally(() => {
          this.$store.dispatch('changeLoadingState')
        })
    }
  }
}
</script>

<style scoped>
form div img {
  height: 200px;
}

.input-field {
    pointer-events: all !important;
}

button {
  font-family: 'Montserrat';
}
</style>
