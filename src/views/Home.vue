<template>
  <home-nav-bar />
  <education-area-table :class="views[0].active ? '' : 'hide'" />
  <exhibition-table :class="views[2].active ? '' : 'hide'" />
  <faq-table :class="views[3].active ? '' : 'hide'"/>
  <recommendation-table :class="views[4].active ? '' : 'hide'" />
  <recommended-website-table :class="views[5].active ? '' : 'hide'" />
  <suggestion-table :class="views[6].active ? '' : 'hide'" />
  <suggestion-type-table :class="views[7].active ? '' : 'hide'" />
  <quiz-table :class="views[8].active ? '' : 'hide'" />
</template>

<script>
import EducationAreaTable from '../components/home/EducationAreaTable.vue'
import ExhibitionTable from '../components/home/ExhibitionTable.vue'
import FaqTable from '../components/home/FAQTable.vue'
import RecommendationTable from '../components/home/RecommendationTable.vue'
import RecommendedWebsiteTable from '../components/home/RecommendedWebsiteTable.vue'
import SuggestionTable from '../components/home/SuggestionTable.vue'
import SuggestionTypeTable from '../components/home/SuggestionTypeTable.vue'
import HomeNavBar from '../components/home/HomeNavBar.vue'
import { mapState } from 'vuex'
import QuizTable from '../components/home/QuizTable.vue'

export default {
  computed: {
    ...mapState(['views', 'isLoading'])
  },
  components: {
    HomeNavBar,
    EducationAreaTable,
    ExhibitionTable,
    FaqTable,
    RecommendationTable,
    RecommendedWebsiteTable,
    SuggestionTable,
    SuggestionTypeTable,
    QuizTable
  },
  created () {
    const loggedIn = this.$store.getters.loggedIn
    if (!loggedIn) {
      this.$router.push('/')
    } else {
      if (this.isLoading) {
        this.$store.dispatch('changeLoadingState')
      }
    }
  }
}
</script>
