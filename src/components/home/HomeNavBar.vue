<template>
  <nav class="nav-extended blue darken-2" :class="views[2].active ? 'huge-navbar' : 'normal-navbar'">
    <div class="nav-wrapper">
      <a @click="resetView" href="#" class="left">
        <img src="../../assets/logo-tm-transparente.png" />
      </a>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab" @click="changeView(0)"><a>Áreas de educación</a></li>
        <li class="tab" @click="changeView(2)"><a>Exhibiciones</a></li>
        <li class="tab" @click="changeView(3)"><a>FAQ</a></li>
        <li class="tab" @click="changeView(4)"><a>Recomendación</a></li>
        <li class="tab" @click="changeView(5)"><a>Sitios recomendados</a></li>
        <li class="tab" @click="changeView(6)"><a>Sugerencias</a></li>
        <li class="tab" @click="changeView(7)"><a>Tipos de Sugerencias</a></li>
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
    }
  }
}
</script>

<style scoped>
.huge-navbar {
  width: 400%;
}

.normal-navbar {
  width: 100%;
}

img {
  height: 65px;
}
</style>
