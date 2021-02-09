<template>
  <home-nav-bar />
  <education-area-table :class="views[0].active ? '' : 'hide'" />
  <exhibition-table :class="views[2].active ? '' : 'hide'" />
</template>

<script>
import EducationAreaTable from '../components/EducationAreaTable.vue'
import ExhibitionTable from '../components/ExhibitionTable.vue'
import HomeNavBar from '../components/HomeNavBar'
import { mapState } from 'vuex'

export default {
  components: {
    HomeNavBar,
    EducationAreaTable,
    ExhibitionTable
  },
  computed: {
    ...mapState(['views'])
  }
}
</script>

<style lang="scss" scoped>

</style>
