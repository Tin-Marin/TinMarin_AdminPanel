<template>
  <nav>
    <div class="nav-wrapper blue darken-2">
      <a href="#">
        <img src="../assets/logo-tm-transparente.png" />
      </a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="https://tinmarin.org">Sitio web</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  template: 'navbar'
}
</script>

<style scoped>
nav ul {
  text-transform: uppercase;
}

img {
  height: 100%;
}
</style>
