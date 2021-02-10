<template>
  <home-nav-bar />
  <education-area-table :class="views[0].active ? '' : 'hide'" />
  <exhibition-table :class="views[2].active ? '' : 'hide'" />
  <faq-table :class="views[3].active ? '' : 'hide'"/>
  <recommendation-table :class="views[4].active ? '' : 'hide'" />
  <recommended-website-table :class="views[5].active ? '' : 'hide'" />
  <suggestion-table :class="views[6].active ? '' : 'hide'" />
  <suggestion-type-table :class="views[7].active ? '' : 'hide'" />
</template>

<script>
import EducationAreaTable from '../components/EducationAreaTable.vue'
import ExhibitionTable from '../components/ExhibitionTable.vue'
import FaqTable from '../components/FAQTable.vue'
import RecommendationTable from '../components/RecommendationTable.vue'
import RecommendedWebsiteTable from '../components/RecommendedWebsiteTable.vue'
import SuggestionTable from '../components/SuggestionTable.vue'
import SuggestionTypeTable from '../components/SuggestionTypeTable.vue'
import HomeNavBar from '../components/HomeNavBar.vue'
import { mapState } from 'vuex'

export default {
  components: {
    HomeNavBar,
    EducationAreaTable,
    ExhibitionTable,
    FaqTable,
    RecommendationTable,
    RecommendedWebsiteTable,
    SuggestionTable,
    SuggestionTypeTable
  },
  computed: {
    ...mapState(['views'])
  }
}
</script>

<style lang="scss" scoped>

</style>
