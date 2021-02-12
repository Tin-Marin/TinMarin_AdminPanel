<template>
  <div>
    <table class="striped centered">
      <thead>
        <tr>
          <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          </td>
          <td v-for="(field, index) in creationFields" :key="index">
            <input type="text" :placeholder="field" required>
          </td>
        </tr>
        <tr v-for="field of suggestionTypes" :key="field.id">
          <td><input :value="field.id" /></td>
          <td><input :value="field.name" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  template: 'suggestiontypetable',
  data () {
    return {
      fields: ['ID', 'Nombre'],
      creationFields: ['Nombre'],
      suggestionTypes: [
        {
          id: 1,
          name: 'Mejora'
        },
        {
          id: 2,
          name: 'Otro'
        }
      ]
    }
  }
}
</script>

<style scoped>
table {
  margin-top: 140px;
}
</style>
