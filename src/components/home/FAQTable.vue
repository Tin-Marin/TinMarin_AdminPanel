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
            <a class="waves-effect green btn" @click="createNewFAQ">save</a>
          </td>
          <td>
          </td>
          <td><input type="text" placeholder="Pregunta" v-model="newFAQ.question" required></td>
          <td><input type="text" placeholder="Respuesta" v-model="newFAQ.answer" required></td>
        </tr>
        <tr v-show="!editing" v-for="field of faqs" :key="field._id">
          <td><i class="material-icons" @click="startEditing">create</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.question }}</td>
          <td>{{ field.answer }}</td>
        </tr>
        <tr v-show="editing" v-for="field of faqs" :key="field.id">
          <td>
            <a @click="startEditing"><i class="material-icons black-text">arrow_back</i></a>
            <br>
            <a @click="updateFAQ(field)"><i class="material-icons green-text">check</i></a>
            <br>
            <a @click="deleteFAQ(field)"><i class="material-icons red-text">clear</i></a>
          </td>
          <td>{{ field._id }}</td>
          <td><input v-model="field.question" /></td>
          <td><input v-model="field.answer" /></td>
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
      newFAQ: {
        question: '',
        answer: ''
      },
      fields: ['Actions', 'ID', 'Pregunta', 'Respuesta'],
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
      try {
        const response = await axios.post('/private/faqs', faq, {
          headers: this.$store.getters.getHeader
        })
        if (response.data && response.status === 201) {
          this.newFAQ = {
            question: '',
            answer: ''
          }
          await this.findFAQs()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async findFAQs () {
      this.$store.dispatch('changeLoadingState')
      const faqs = await axios.get('/faqs')
      this.$store.dispatch('changeLoadingState')
      this.faqs = faqs.data
    },
    async updateFAQ (faq) {
      try {
        const newFAQ = {
          question: faq.question,
          answer: faq.answer
        }
        const response = await axios.put('/private/faqs/' + faq._id, newFAQ, {
          headers: this.$store.getters.getHeader
        })
        if (response === 200) {
          await this.findFAQs()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async deleteFAQ (faq) {
      const response = await axios.delete('/private/faqs/' + faq._id, {
        headers: this.$store.getters.getHeader
      })
      if (response.status === 204) {
        await this.findFAQs()
      }
    }
  },
  async mounted () {
    await this.findFAQs()
  }
}
</script>

<style scoped>
table {
  margin-top: 140px;
}

.btn {
  cursor: pointer;
  position: static;
  width: 100px;
}

i {
  cursor: pointer;
}
</style>
