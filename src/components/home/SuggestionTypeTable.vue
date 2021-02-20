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
            <input type="text" placeholder="Nombre" v-model="newSuggestionType" required>
          </td>
        </tr>
        <tr v-show="!editing" v-for="field of suggestionTypes" :key="field.id">
          <td><i class="material-icons" @click="startEditing">create</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.name }}</td>
        </tr>
        <tr v-show="editing" v-for="field of suggestionTypes" :key="field.id">
          <td>
            <a @click="startEditing"><i class="material-icons black-text">arrow_back</i></a>
            <br>
            <a @click="updateSuggestionType(field)"><i class="material-icons green-text">check</i></a>
            <br>
            <a @click="deleteSuggestionType(field)"><i class="material-icons red-text">clear</i></a>
          </td>
          <td>{{ field._id }}</td>
          <td><input v-model="field.name"/></td>
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
      try {
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
      } catch (error) {
        if (error.response.status) this.$router.push('/logout')
      }
    },
    async findSuggestionTypes () {
      this.$store.dispatch('changeLoadingState')
      const response = await axios.get('/suggestiontypes')
      this.$store.dispatch('changeLoadingState')
      this.suggestionTypes = response.data
    },
    async updateSuggestionType (suggestionType) {
      try {
        const newSuggestionType = {
          name: suggestionType.name
        }
        const response = await axios.put('/private/suggestiontypes/' + suggestionType._id, newSuggestionType, {
          headers: this.$store.getters.getHeader
        })
        if (response === 200) {
          await this.findSuggestionTypes()
        }
      } catch (error) {
        if (error.response.status) this.$router.push('/logout')
      }
    },
    async deleteSuggestionType (suggestionType) {
      try {
        const response = await axios.delete('/private/suggestiontypes/' + suggestionType._id, {
          headers: this.$store.getters.getHeader
        })
        if (response.status === 204) {
          await this.findSuggestionTypes()
        }
      } catch (error) {
        if (error.response.status) this.$router.push('/logout')
      }
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

.btn {
  cursor: pointer;
  position: inherit;
  width: 100px;
}

i {
  cursor: pointer;
}
</style>
