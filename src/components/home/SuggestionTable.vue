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
          <td><i class="material-icons" @click="startEditing">create</i></td>
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
      const suggestions = await axios.get('/private/suggestions', {
        headers: this.$store.getters.getHeader
      })
      this.suggestions = suggestions.data
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
</style>
