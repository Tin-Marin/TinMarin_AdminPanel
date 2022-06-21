<template>
  <nav class="nav-extended blue darken-2">
    <div class="nav-wrapper">
        <a @click="resetView" href="#" class="center">
          <img src="../../assets/logo-tm-recuadro.png" />
        </a>
        <a @click="logout" id="logout" class="right">Loguot</a>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab" @click="changeView(0)"><a>Áreas de educación</a></li>
        <li class="tab" @click="changeView(2)"><a>Exhibiciones</a></li>
        <li class="tab" @click="changeView(3)"><a>Quiz</a></li>
        <li class="tab" @click="changeView(4)"><a>Sonidos</a></li>
        <li class="tab" @click="changeView(5)"><a>Sugerencias</a></li>
        <li class="tab" @click="changeView(6)"><a>Tipos de Sugerencias</a></li>
        <li class="tab" @click="changeView(7)"><a>FAQ</a></li>
        <li class="tab" @click="changeView(8)"><a>Recomendación</a></li>
        <li class="tab" @click="changeView(9)"><a>Sitios recomendados</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  template: 'homenavbar',
  computed: {
    ...mapState(['views'])
  },
  methods: {
    changeView (option) {
      this.resetView()
      for (const view of this.views) {
        if (option === this.views.indexOf(view)) {
          view.active = true
        }
      }
    },
    resetView () {
      for (const view of this.views) {
        view.active = false
      }
    },
    logout () {
      this.$router.push('/logout')
    }
  }
}
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
}

img {
  height: 65px;
  margin-top: 0.5em;
  margin-bottom: -1.5em;
  margin-left: 7em;
}

#logout {
  cursor:pointer;
  padding-left: 25px;
  padding-right: 25px;
  text-transform: uppercase;
}
</style>
