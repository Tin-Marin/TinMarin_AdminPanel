<template>
  <div class="container grey lighten-3 z-depth-2"
    style="margin-top: 5%; padding-top: 25px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px">
    <div class="row">
      <form>
        <div class="col s12 center-align">
          <img src="../assets/logo-tm-transparente.png" />
        </div>
        <div class="col s12 input-field">
          <input type="text" class="validate" id="username" required>
          <label for="username">Username</label>
        </div>
        <div class="col s12 input-field">
          <input type="password" class="validate" id="password" required>
          <label for="password">Password</label>
        </div>
        <div class="col s12 center-align">
          <button type="submit" class="btn blue darken-2 waves-effect">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  template: 'loginbox'
}
</script>

<style scoped>
form div img {
  height: 200px;
}
</style>
