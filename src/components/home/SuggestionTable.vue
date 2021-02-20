<template>
  <div>
    <table class="striped centered">
      <thead>
        <tr>
          <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <!--Fix CORS-->
        <tr v-for="field of suggestions" :key="field.id">
          <td><i class="material-icons red-text" @click="deleteSuggestion(field._id)">clear</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.suggestionType }}</td>
          <td>{{ field.suggestion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  template: 'suggestiontable',
  data () {
    return {
      fields: ['Actions', 'ID', 'suggestionType', 'suggestion'],
      suggestions: []
    }
  },
  methods: {
    async findSuggestions () {
      try {
        this.$store.dispatch('changeLoadingState')
        const suggestions = await axios.get('/private/suggestions', {
          headers: this.$store.getters.getHeader
        })
        this.$store.dispatch('changeLoadingState')
        this.suggestions = suggestions.data
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push('/logout')
        }
      }
    },
    async deleteSuggestion (_id) {
      try {
        const suggestion = await axios.delete('/private/suggestions/' + _id, {
          headers: this.$store.getters.getHeader
        })
        if (suggestion.status === 204) {
          await this.findSuggestions()
        }
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push('/logout')
        }
      }
    }
  },
  async mounted () {
    await this.findSuggestions()
  }
}
</script>

<style scoped>
table {
  margin-top: 140px;
}

i {
  cursor: pointer;
}
</style>
