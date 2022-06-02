<template>
  <nav>
    <div class="nav-wrapper blue darken-2">
      <a href="#">
        <img src="../../assets/logo-tm-recuadro.png" />
      </a>
      <ul id="nav-mobile" class="right">
        <li><a href="https://tinmarin.org">Sitio web</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  template: 'loginnavbar'
}
</script>

<style scoped>
nav ul {
  font-weight: 400;
  text-transform: uppercase;
}

img {
  height: 3.5rem;
  margin-top: 0.4em;
  margin-left: 7em;
}
</style>
