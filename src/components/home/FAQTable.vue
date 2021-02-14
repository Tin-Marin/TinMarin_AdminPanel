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
            <a class="waves-effect green btn" @click="createFAQ">save</a>
          </td>
          <td>
          </td>
          <!--TODO: separate from loop-->
          <td v-for="(field, index) in creationFields" :key="index">
            <input type="text" :placeholder="field" v-model="newFAQ" required>
          </td>
        </tr>
        <tr v-show="!editing" v-for="field of faqs" :key="field._id">
          <td><i class="material-icons" @click="startEditing">create</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.question }}</td>
          <td>{{ field.answer }}</td>
        </tr>
        <tr v-show="editing" v-for="field of faqs" :key="field.id">
          <td>
            <a class="waves-effect black btn">back</a>
            <br>
            <a class="waves-effect green btn">save</a>
            <br>
            <a class="waves-effect red btn">delete</a>
          </td>
          <td>{{ field._id }}</td>
          <td><input :value="field.question" /></td>
          <td><input :value="field.answer" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  template: 'faqtable',
  data () {
    return {
      editing: false,
      newFAQ: '',
      fields: ['Actions', 'ID', 'Pregunta', 'Respuesta'],
      creationFields: ['Pregunta', 'Respuesta'],
      faqs: []
    }
  },
  methods: {
    startEditing () {
      if (this.editing) {
        this.editing = false
      } else {
        this.editing = true
      }
    },
    async createNewFAQ () {
      const faq = this.newFAQ
      const response = await axios.post('/private/faqs', faq, {
        headers: this.$store.getters.getHeader
      })
      if (response.data && response.status === 201) {
        this.newFAQ = ''
        await this.findFAQ()
      }
    },
    async findFAQ () {
      const faq = await axios.get('/faqs')
      this.faqs = faq.data
    }
  },
  async mounted () {
    await this.findFAQ()
  }
}
</script>

<style scoped>
table {
  margin-top: 140px;
}
</style>
