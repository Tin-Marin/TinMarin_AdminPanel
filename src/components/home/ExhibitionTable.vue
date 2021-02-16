<template>
  <div id="container">
    <div id="actions" class="container">
      <form action="#" class="row">
        <div class="col s4">
          <p>
            <label>
              <input @click="action(1)" name="group1" type="radio" />
              <span>Crear</span>
            </label>
          </p>
        </div>
        <div class="col s4">
          <p>
            <label>
              <input @click="action(2)" name="group1" type="radio" />
              <span>Editar</span>
            </label>
          </p>
        </div>
        <div class="col s4">
          <p>
            <label>
              <input @click="action(3)" name="group1" type="radio"  />
              <span>Borrar</span>
            </label>
          </p>
        </div>
      </form>
    </div>
    <div>
      <form v-show="creating || (editing && selected)" class="container">
        <div class="row">
          <div class="col s12">
            <input type="text" placeholder="Nombre" v-model="newExhibition.name" required>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <textarea type="text" placeholder="Descripción" v-model="newExhibition.description" required></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <input type="text" placeholder="Imagen" v-model="newExhibition.images[0]" required>
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <input type="number" placeholder="Número de patrocinadores" v-model.number="numberOfSponsors" required>
          </div>
          <div class="col s9">
            <div v-for="(element, index) in numberOfSponsors" :key="index">
              <input type="text" placeholder="Nombre de patrocinadores" v-model="newExhibition.sponsorName[index]">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <input type="number" placeholder="Número de logos de patrocinadores" v-model.number="numberOfLogos" required>
          </div>
          <div class="col s9">
            <div v-for="(element, index) in numberOfLogos" :key="index">
              <input type="text" placeholder="Logo de patrocinadores" v-model="newExhibition.sponsorLogo[index]">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <input type="number" placeholder="Número áreas de educación" v-model.number="numberOfEducationAreas" required>
          </div>
          <div class="col s9">
            <div v-for="(element, index) in numberOfEducationAreas" :key="index">
              <input type="text" placeholder="Áreas de educación" v-model="newExhibition.educationArea[index]">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <input type="text" placeholder="Edad mínima" v-model.number="newExhibition.minimunAge" required>
          </div>
          <div class="col s3">
            <input type="text" placeholder="Edad máxima" v-model.number="newExhibition.maximumAge" required>
          </div>
          <div class="col s3">
            <input type="text" placeholder="Duración" v-model.number="newExhibition.duration" required>
          </div>
          <div class="col s3">
            <input type="text" placeholder="Capacidad" v-model.number="newExhibition.capacity" required>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <textarea type="text" placeholder="Dato curioso" v-model="newExhibition.curiousInfo" required></textarea>
          </div>
        </div>
        <a v-if="creating" class="waves-effect green btn" @click="createNewExhibition">save</a>
        <a v-if="editing" class="waves-effect grey btn" @click="unselectToUpdate">back</a>
        <a v-if="editing" class="waves-effect blue darken-2 btn" @click="updateExhibition">save</a>
      </form>
    </div>
    <table class="striped centered">
      <thead>
        <tr v-show="deleting">
          <th v-for="(field, index) in fieldsDeleting" :key="index">{{ field }}</th>
        </tr>
        <tr v-show="editing && !selected">
          <th v-for="(field, index) in fieldsUpdating" :key="index">{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="deleting || (editing && !selected)" v-for="field of exhibitions" :key="field._id">
          <td>
            <i v-if="editing" class="material-icons" @click="selectToUpdate(field)">create</i>
            <i v-if="deleting" class="material-icons red-text" @click="deleteExhibition(field)">clear</i>
          </td>
          <td>{{ field._id }}</td>
          <td>{{ field.name }}</td>
          <td>{{ field.description }}</td>
          <td>{{ field.images }}</td>
          <td>{{ field.sponsorName }}</td>
          <td>{{ field.sponsorLogo }}</td>
          <td>{{ field.educationArea }}</td>
          <td>{{ field.minimunAge }}</td>
          <td>{{ field.maximumAge }}</td>
          <td>{{ field.duration }}</td>
          <td>{{ field.capacity }}</td>
          <td>{{ field.curiousInfo }}</td>
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
      creating: false,
      editing: false,
      deleting: false,
      selected: false,
      numberOfSponsors: null,
      numberOfLogos: null,
      numberOfEducationAreas: null,
      newExhibition: {
        name: '',
        description: '',
        images: [],
        sponsorName: [],
        sponsorLogo: [],
        educationArea: [],
        minimunAge: null,
        maximumAge: null,
        duration: null,
        capacity: null,
        curiousInfo: ''
      },
      fieldsDeleting: ['Delete', 'ID', 'Nombre', 'Descripción', 'Imagen', 'Patrocinador', 'Imagen del patrocinador', 'Áreas de educación', 'Edad min.', 'Edad Max', 'Duración', 'Capacidad', 'Dato curioso'],
      fieldsUpdating: ['Update', 'ID', 'Nombre', 'Descripción', 'Imagen', 'Patrocinador', 'Imagen del patrocinador', 'Áreas de educación', 'Edad min.', 'Edad Max', 'Duración', 'Capacidad', 'Dato curioso'],
      exhibitions: []
    }
  },
  methods: {
    action (option) {
      this.creating = false
      this.editing = false
      this.deleting = false
      this.reseter()
      switch (option) {
        case 1:
          this.creating = true
          break
        case 2:
          this.editing = true
          this.findExhibitions()
          break
        case 3:
          this.deleting = true
          this.findExhibitions()
          break
      }
    },
    async createNewExhibition () {
      const exhibition = this.newExhibition
      const response = await axios.post('/private/exhibitions', exhibition, {
        headers: this.$store.getters.getHeader
      })
      if (response.data && response.status === 201) {
        this.reseter()
        await this.findExhibitios()
      }
    },
    async findExhibitions () {
      const exhibitions = await axios.get('/exhibitions')
      this.exhibitions = exhibitions.data
    },
    async deleteExhibition (exhibition) {
      const response = await axios.delete('/private/exhibitions/' + exhibition._id, {
        headers: this.$store.getters.getHeader
      })
      if (response.status === 204) {
        await this.findExhibitions()
      }
    },
    selectToUpdate (exhibition) {
      this.selected = true
      this.newExhibition = exhibition
    },
    unselectToUpdate () {
      this.reseter()
      this.editing = true
    },
    async updateExhibition () {
      const response = await axios.put('/private/exhibitions/' + this.newExhibition._id, this.newExhibition, {
        headers: this.$store.getters.getHeader
      })
      if (response === 200) {
        this.reseter()
        await this.findEducationAreas()
      }
    },
    reseter () {
      this.newExhibition = {
        name: '',
        description: '',
        images: [],
        sponsorName: [],
        sponsorLogo: [],
        educationArea: [],
        minimunAge: null,
        maximumAge: null,
        duration: null,
        capacity: null,
        curiouInfo: ''
      }
      this.numberOfSponsors = null
      this.numberOfLogos = null
      this.numberOfEducationAreas = null
      this.selected = false
    }
  },
  async mounted () {
    await this.findExhibitions()
  }
}
</script>

<style scoped>
#container {
  margin-top: 150px;
}

table {
  overflow-y: scroll;
  width: 400%;
}
.btn {
  cursor: pointer;
  margin: 10px;
  position: inherit;
  width: 100px;
}

i {
  cursor: pointer;
}
</style>
