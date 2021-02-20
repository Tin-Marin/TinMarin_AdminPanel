<template>
  <div>
    <loader v-if="isLoading" />
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
          </td>
          <td>
            <input type="text" placeholder="Nombre" v-model="newEducationArea" required>
          </td>
        </tr>
        <tr v-show="!editing" v-for="field of educationAreas" :key="field._id">
          <td><i class="material-icons" @click="startEditing">create</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.name }}</td>
        </tr>
        <tr v-show="editing" v-for="field of educationAreas" :key="field.id">
          <td>
            <a @click="startEditing"><i class="material-icons black-text">arrow_back</i></a>
            <br>
            <a @click="updateEducationArea(field)"><i class="material-icons green-text">check</i></a>
            <br>
            <a @click="deleteEducationArea(field)"><i class="material-icons red-text">clear</i></a>
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
import Loader from '@/components/general/Loader.vue'

export default {
  template: 'educationareatable',
  components: {
    Loader
  },
  data () {
    return {
      editing: false,
      newEducationArea: '',
      fields: ['Actions', 'ID', 'Nombre'],
      educationAreas: []
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
    async createNewEducationArea () {
      const educationArea = {
        name: this.newEducationArea
      }
      try {
        const response = await axios.post('/private/education-areas', educationArea, {
          headers: this.$store.getters.getHeader
        })
        if (response.data && response.status === 201) {
          this.newEducationArea = ''
          await this.findEducationAreas()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async findEducationAreas () {
      this.$store.dispatch('changeLoadingState')
      const educationAreas = await axios.get('/education-areas')
      this.$store.dispatch('changeLoadingState')
      this.educationAreas = educationAreas.data
    },
    async updateEducationArea (educationArea) {
      try {
        const newEducationArea = {
          name: educationArea.name
        }
        const response = await axios.put('/private/education-areas/' + educationArea._id, newEducationArea, {
          headers: this.$store.getters.getHeader
        })
        if (response === 200) {
          await this.findEducationAreas()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async deleteEducationArea (educationArea) {
      try {
        const response = await axios.delete('/private/education-areas/' + educationArea._id, {
          headers: this.$store.getters.getHeader
        })
        if (response.status === 204) {
          await this.findEducationAreas()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    }
  },
  async mounted () {
    await this.findEducationAreas()
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
