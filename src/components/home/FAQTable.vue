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
        <tr v-for="field of faqs" :key="field.id">
          <td><input :value="field.id" /></td>
          <td><input :value="field.question" /></td>
          <td><input :value="field.answer" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  template: 'faqtable',
  data () {
    return {
      fields: ['ID', 'Pregunta', 'Respuesta'],
      creationFields: ['Pregunta', 'Respuesta'],
      faqs: [
        {
          id: 1,
          question: 'Pregunta 1',
          answer: 'Respuesta 1'
        },
        {
          id: 2,
          question: 'Pregunta 2',
          answer: 'Respuesta 2'
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
