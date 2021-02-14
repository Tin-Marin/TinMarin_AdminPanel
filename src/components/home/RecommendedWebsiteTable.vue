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
            <a class="waves-effect green btn" @click="createNewEducationArea">save</a>
          </td>
          <td>
            <!--TODO: separate from loop-->
          </td>
          <td v-for="(field, index) in creationFields" :key="index">
            <input type="text" :placeholder="field" required>
          </td>
        </tr>
        <tr v-show="!editing" v-for="field of recommendedWebsites" :key="field._id">
          <td><i class="material-icons" @click="startEditing">create</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.url }}</td>
          <td>{{ field.image }}</td>
          <td>{{ field.title }}</td>
        </tr>
        <tr v-show="editing" v-for="field of recommendedWebsites" :key="field.id">
          <td>
            <a class="waves-effect black btn">back</a>
            <br>
            <a class="waves-effect green btn">save</a>
            <br>
            <a class="waves-effect red btn">delete</a>
          </td>
          <td>{{ field._id }}</td>
          <td><input :value="field.url" /></td>
          <td><input :value="field.image" /></td>
          <td><input :value="field.title" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  template: 'recommendedwebsitetable',
  data () {
    return {
      editing: false,
      newRecommendedWebsite: '',
      fields: ['Actions', 'ID', 'URL', 'Imagen', 'Título'],
      creationFields: ['URL', 'Imagen', 'Título'],
      recommendedWebsites: []
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
    async createNewRecommendedWebsite () {
      // TODO: Fix CORS
      const recommendedWebsite = this.recommendedWebsites
      const response = await axios.post('/private/recommended-websites', recommendedWebsite, {
        headers: this.$store.getters.getHeader
      })
      if (response.data && response.status === 201) {
        this.newRecommendedWebsite = ''
        await this.findRecommendedWebsites()
      }
    },
    async findRecommendedWebsites () {
      const recommendedWebsites = await axios.get('/recommended-websites')
      this.recommendedWebsites = recommendedWebsites.data
    }
  },
  async mounted () {
    await this.findRecommendedWebsites()
  }
}
</script>

<style scoped>
table {
  margin-top: 140px;
}
</style>
