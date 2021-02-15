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
          </td>
          <!--TODO: separate from loop-->
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
            <a class="waves-effect black btn" @click="startEditing">back</a>
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
  template: 'educationareatable',
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
      const response = await axios.post('/private/education-areas', educationArea, {
        headers: this.$store.getters.getHeader
      })
      if (response.data && response.status === 201) {
        this.newEducationArea = ''
        await this.findEducationAreas()
      }
    },
    async findEducationAreas () {
      const educationAreas = await axios.get('/education-areas')
      this.educationAreas = educationAreas.data
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
