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
            <a class="waves-effect green btn" @click="createNewRecommendation">save</a>
          </td>
          <td v-for="(field, index) in creationFields" :key="index">
            <input type="text" :placeholder="field" required>
          </td>
        </tr>
        <tr v-show="!editing" v-for="field of recommendations" :key="field._id">
          <td><i class="material-icons" @click="startEditing">create</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.title }}</td>
          <td>{{ field.description }}</td>
          <td>{{ field.steps }}</td>
          <td>{{ field.source }}</td>
          <td>{{ field.image }}</td>
        </tr>
        <tr v-show="editing" v-for="field of recommendations" :key="field.id">
          <td>
            <a class="waves-effect black btn">back</a>
            <br>
            <a class="waves-effect green btn">save</a>
            <br>
            <a class="waves-effect red btn">delete</a>
          </td>
          <td>{{ field._id }}</td>
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
import axios from 'axios'

export default {
  template: 'recommedationtable',
  data () {
    return {
      editing: false,
      newRecommendation: {
        title: '',
        description: [],
        steps: [],
        source: '',
        image: ''
      },
      fields: ['Actions', 'ID', 'Título', 'Descripción', 'Pasos', 'Fuente', 'Imagen'],
      creationFields: ['Título', 'Descripción', 'Pasos', 'Fuente', 'Imagen'],
      recommendations: []
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
    async createNewRecommendation () {
      // TODO: Fix CORS
      const recommendation = this.newRecommendation
      const response = await axios.post('/private/recommendations', recommendation, {
        headers: this.$store.getters.getHeader
      })
      if (response.data && response.status === 201) {
        this.newRecommendation = ''
        await this.findRecommendation()
      }
    },
    async findRecommendations () {
      const recommendations = await axios.get('/recommendations')
      this.recommendations = recommendations.data
    }
  },
  async mounted () {
    await this.findRecommendations()
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
