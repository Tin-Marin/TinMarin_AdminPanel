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
            <a class="waves-effect green btn" @click="createNewExhibition">save</a>
          </td>
          <td>
          </td>
          <!--TODO: separate from loop-->
          <td v-for="(field, index) in creationFields" :key="index">
            <input type="text" :placeholder="field" v-model="newExhibition" required>
          </td>
        </tr>
        <tr v-show="!editing" v-for="field of exhibitions" :key="field._id">
          <td><i class="material-icons" @click="startEditing">create</i></td>
          <td>{{ field._id }}</td>
          <td>{{ field.name }}</td>
          <td>{{ field.description }}</td>
          <td>{{ field.images }}</td>
          <td>{{ field.sponsorName }}</td>
          <td>{{ field.sponsorLogo }}</td>
          <td>{{ field.educationArea }}</td>
          <td>{{ field.minimumAge }}</td>
          <td>{{ field.maximumAge }}</td>
          <td>{{ field.duration }}</td>
          <td>{{ field.capacity }}</td>
          <td>{{ field.curiousInfo }}</td>
        </tr>
        <tr v-show="editing" v-for="field of exhibitions" :key="field.id">
          <td>
            <a class="waves-effect black btn">back</a>
            <br>
            <a class="waves-effect green btn">save</a>
            <br>
            <a class="waves-effect red btn">delete</a>
          </td>
          <td>{{ field._id }}</td>
          <td><input :value="field.name"/></td>
          <td><textarea :value="field.description"></textarea></td>
          <td><input :value="field.images"/></td>
          <td><input :value="field.sponsorName"/></td>
          <td><input :value="field.sponsorLogo"/></td>
          <td><input :value="field.educationArea"/></td>
          <td><input :value="field.minimumAge"/></td>
          <td><input :value="field.maximumAge"/></td>
          <td><input :value="field.duration"/></td>
          <td><input :value="field.capacity"/></td>
          <td><textarea :value="field.curiousInfo"></textarea></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// TODO: develop the picker for the educaction area
import axios from 'axios'

export default {
  template: 'exhibitiontable',
  data () {
    return {
      editing: false,
      newExhibition: {
        name: '',
        description: '',
        images: [],
        sponsorName: [],
        sponsorLogo: [],
        educationArea: [],
        minimumAge: 0,
        maximumAge: 0,
        duration: 0,
        capacity: 0,
        curiouInfo: ''
      },
      fields: ['Actions', 'ID', 'Nombre', 'Descripción', 'Imagen', 'Patrocinador', 'Imagen del patrocinador', 'Áreas de educación', 'Edad min.', 'Edad Max', 'Duración', 'Capacidad', 'Dato curioso'],
      creationFields: ['Nombre', 'Descripción', 'Imagen', 'Patrocinador', 'Imagen del patrocinador', 'Áreas de educación', 'Edad min.', 'Edad Max', 'Duración', 'Capacidad', 'Dato curioso'],
      exhibitions: []
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
    async createNewExhibition () {
      // TODO: Fix CORS
      const exhibition = this.newExhibition
      const response = await axios.post('/private/education-areas', exhibition, {
        headers: this.$store.getters.getHeader
      })
      if (response.data && response.status === 201) {
        this.newEducationArea = ''
        await this.findExhibitios()
      }
    },
    async findExhibitions () {
      const exhibitions = await axios.get('/exhibitions')
      this.exhibitions = exhibitions.data
    }
  },
  async mounted () {
    await this.findExhibitions()
  }
}
</script>

<style scoped>
table {
  margin-top: 140px;
  overflow-y: scroll;
  width: 400%;
}
.container {
  border: 2px solid gray;
  margin-top: 1%;
  width: 90%;
}
</style>
