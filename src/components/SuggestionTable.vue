<template>
  <div>
    <table class="striped centered">
      <thead>
        <tr>
          <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="field of recommendedWebsites" :key="field.id">
          <td>{{ field.id }}</td>
          <td>{{ field.suggestionType }}</td>
          <td>{{ field.suggestion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  template: 'suggestiontable',
  data () {
    return {
      fields: ['ID', 'suggestionType', 'suggestion'],
      recommendedWebsites: [
        {
          id: 1,
          suggestionType: 'Suggestion Type 1',
          suggestion: 'suggestion 1'
        },
        {
          id: 2,
          suggestionType: 'Suggestion Type 2',
          suggestion: 'suggestion 2'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
