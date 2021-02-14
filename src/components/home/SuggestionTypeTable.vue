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
            <a class="waves-effect green btn" @click="createNewSuggestionType">save</a>
          </td>
          <td>
          </td>
          <td>
            <input type="text" :placeholder="Nombre" v-model="newSuggestionType" required>
          </td>
        </tr>
        <tr v-show="!editing" v-for="field of suggestionTypes" :key="field.id">
          <td><i class="material-icons" @click="startEditing">create</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.name }}</td>
        </tr>
        <tr v-show="editing" v-for="field of suggestionTypes" :key="field.id">
          <td>
            <a class="waves-effect black btn">back</a>
            <br>
            <a class="waves-effect green btn">save</a>
            <br>
            <a class="waves-effect red btn">delete</a>
          </td>
          <td>{{ field._id }}</td>
          <td><input :value="field.name"/></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  template: 'suggestiontypetable',
  data () {
    return {
      editing: false,
      newSuggestionType: '',
      fields: ['Actions', 'ID', 'Nombre'],
      suggestionTypes: []
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
    async createNewSuggestionType () {
      // TODO: Fix CORS
      const suggestionType = {
        name: this.newSuggestionType
      }
      const response = await axios.post('/private/suggestiontypes', suggestionType, {
        headers: this.$store.getters.getHeader
      })
      if (response.data && response.status === 201) {
        this.newSuggestionType = ''
        await this.findSuggestionTypes()
      }
    },
    async findSuggestionTypes () {
      const suggestionTypes = await axios.get('/suggestiontypes')
      this.suggestionTypes = suggestionTypes.data
    }
  },
  async mounted () {
    await this.findSuggestionTypes()
  }
}
</script>

<style scoped>
table {
  margin-top: 140px;
}
</style>
