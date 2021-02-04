<template>
  <div class="container grey lighten-3 z-depth-2"
    style="margin-top: 5%; padding-top: 25px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px">
    <div class="row">
      <form @submit.prevent="login">
        <div class="col s12 center-align">
          <img src="../assets/logo-tm-transparente.png" />
        </div>
        <div class="col s12 input-field">
          <input type="text" class="validate" id="username" v-model="username" required>
          <label for="username">Username</label>
        </div>
        <div class="col s12 input-field">
          <input type="password" class="validate" id="password" v-model="password" required>
          <label for="password">Password</label>
        </div>
        <div class="col s12 center-align">
          <button type="submit" class="btn blue darken-2 waves-effect" @click="login">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  template: 'loginbox',
  data () {
    return {
      username: '',
      password: '',
      endpoint: 'https://tin-marin-app.herokuapp.com/api/v1/auth/login',
      token: ''
    }
  },
  methods: {
    async login () {
      try {
        const { data } = await axios.post(this.endpoint, {
          username: this.username,
          password: this.password
        })
        this.token = data.token
      } catch (error) {
        throw new Error('Something went wrong. Try later.')
      }
    }
  }
}
</script>

<style scoped>
form div img {
  height: 200px;
}
</style>
