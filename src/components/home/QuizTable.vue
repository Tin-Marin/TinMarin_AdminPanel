<template>
  <div>
    <table class='striped centered'>
      <thead>
        <tr>
          <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a class='waves-effect green btn' @click="createNewQuiz">save</a>
          </td>
          <td></td>
          <td>
            <input
              type='text'
              placeholder='Pregunta'
              v-model="newQuiz.question"
              required
            />
          </td>
          <td>
            <div v-for="(element, index) in 4" :key="index">
              <input type="text" :placeholder="'Opción ' + (index + 1)" v-model="newQuiz.options[index]">
            </div>
          </td>
          <td>
            <input type='text' placeholder='Opción correcta' v-model="newQuiz.correct_option" required/>
          </td>
          <td>
            <input type='text' placeholder='Exhibición' v-model="newQuiz.exhibition" required/>
          </td>
        </tr>
        <tr v-show="!editing" v-for="field of quizzes" :key="field._id">
          <td><i class='material-icons' @click="startEditing">create</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.question }}</td>
          <td>{{ field.options }}</td>
          <td>{{ field.correct_option }}</td>
          <td>{{field.exhibition}}</td>
        </tr>
        <tr v-show="editing" v-for="field of quizzes" :key="field.id">
          <td>
            <a @click="startEditing"><i class='material-icons black-text'>arrow_back</i></a>
            <br />
            <a @click="updateQuiz(field)"><i class='material-icons green-text'>check</i></a>
            <br />
            <a @click="deleteQuiz(field)"><i class='material-icons red-text'>clear</i></a>
          </td>
          <td>{{ field._id }}</td>
          <td><input v-model='field.question' /></td>
          <td>
            <div v-for="(element, index) in 4" :key="index">
              <input v-model="field.options[index]">
            </div>
          </td>
          <td><input v-model='field.correct_option' /></td>
          <td><input v-model='field.exhibition' /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  template: 'quiztable',
  data () {
    return {
      editing: false,
      newQuiz: {
        question: '',
        options: [],
        correct_option: '',
        exhibition: ''
      },
      fields: ['Actions', 'ID', 'Pregunta', 'Opciones', 'Opcion correcta', 'Exhibición'],
      exhibitions: [],
      quizzes: []
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
    async retrieveExhibitions () {
      const response = await axios.get('/exhibitions')
      if (response.status === 200) this.exhibitions = response.data
    },
    async createNewQuiz () {
      try {
        const quiz = this.newQuiz
        const response = await axios.post('/private/quizzes', quiz, {
          headers: this.$store.getters.getHeader
        })
        if (response.data && response.status === 201) {
          this.newQuiz = {
            question: '',
            options: [],
            correct_option: '',
            exhibition: ''
          }
          await this.findQuizzes()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async findQuizzes () {
      this.$store.dispatch('changeLoadingState')
      const quizzes = await axios.get('/quizzes')
      this.$store.dispatch('changeLoadingState')
      this.quizzes = quizzes.data
    },
    async updateQuiz (quiz) {
      try {
        const newQuiz = {
          question: quiz.question,
          options: quiz.options,
          correct_option: quiz.correct_option,
          exhibition: quiz.exhibition
        }
        const response = await axios.put('/private/quizzes/' + quiz._id, newQuiz, {
          headers: this.$store.getters.getHeader
        })
        if (response === 200) {
          await this.findQuizzes()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async deleteQuiz (quiz) {
      const response = await axios.delete('/private/quizzes/' + quiz._id, {
        headers: this.$store.getters.getHeader
      })
      if (response.status === 204) {
        await this.findQuizzes()
      }
    }
  },
  async mounted () {
    await this.findQuizzes()
    await this.retrieveExhibitions()
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
