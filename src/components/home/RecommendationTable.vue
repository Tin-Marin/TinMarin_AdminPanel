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
        <tr v-for="field of recommendations" :key="field.id">
          <td><input :value="field.id" /></td>
          <td><input :value="field.title" /></td>
          <td><input :value="field.description" /></td>
          <td><input :value="field.steps" /></td>
          <td><input :value="field.source" /></td>
          <td><input :value="field.image" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  template: 'recommedationtable',
  data () {
    return {
      fields: ['ID', 'Título', 'Descripción', 'Pasos', 'Fuente', 'Imagen'],
      creationFields: ['Título', 'Descripción', 'Pasos', 'Fuente', 'Imagen'],
      recommendations: [
        {
          id: 1,
          title: 'Título 1',
          description: ['Description'],
          steps: ['Pasos'],
          source: 'Fuente',
          image: 'Imagen'
        },
        {
          id: 2,
          title: 'Título 2',
          description: ['Description'],
          steps: ['Pasos'],
          source: 'Fuente',
          image: 'Imagen'
        }
      ]
    }
  }
}
</script>

<style scoped>
table {
  margin-top: 140px;
  overflow: scroll;
  width: 200%;
}
</style>
