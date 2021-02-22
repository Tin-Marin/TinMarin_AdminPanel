<template>
  <div id="container">
    <div id="actions">
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
    <div id="content">
      <form v-show="creating || (editing && selected)" class="container">
        <div class="row">
          <div class="col s12">
            <input type="text" placeholder="Título" v-model="newRecommendation.title" required>
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <input type="number" placeholder="Número de párrafos" v-model.number="numberOfParagraphs" required>
          </div>
          <div class="col s9">
            <div v-for="(element, index) in numberOfParagraphs" :key="index">
              <input type="text" placeholder="Párrafo de la descripción" v-model="newRecommendation.description[index]">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <input type="number" placeholder="Número de pasos" v-model.number="numberOfSteps" required>
          </div>
          <div class="col s9">
            <div v-for="(element, index) in numberOfSteps" :key="index">
              <input type="text" placeholder="Paso" v-model="newRecommendation.steps[index]">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <input type="text" placeholder="Fuente" v-model="newRecommendation.source">
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <input type="text" placeholder="Imagen" v-model="newRecommendation.image" required>
          </div>
        </div>
        <a v-if="creating" class="green btn" @click="createNewRecommendation">save</a>
        <a v-if="editing" class="grey btn" @click="unselectToUpdate">back</a>
        <a v-if="editing" class="blue darken-2 btn" @click="updateRecommendation">save</a>
      </form>
      <table class="striped centered">
        <thead>
          <tr v-show="deleting">
            <th>Delete</th>
            <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
          </tr>
          <tr v-show="editing && !selected">
            <th>Update</th>
            <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="deleting || (editing && !selected)" v-for="field of recommendations" :key="field._id">
            <td>
              <i v-if="editing" class="material-icons" @click="selectToUpdate(field)">create</i>
              <i v-if="deleting" class="material-icons red-text" @click="deleteRecommendation(field)">clear</i>
            </td>
            <td>{{ field._id }}</td>
            <td>{{ field.title }}</td>
            <td>{{ field.description }}</td>
            <td>{{ field.steps }}</td>
            <td>{{ field.source }}</td>
            <td>{{ field.image }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  template: 'recommedationtable',
  data () {
    return {
      creating: false,
      editing: false,
      deleting: false,
      selected: false,
      numberOfParagraphs: null,
      numberOfSteps: null,
      newRecommendation: {
        title: '',
        description: [],
        steps: [],
        source: '',
        image: ''
      },
      fields: ['ID', 'Título', 'Descripción', 'Pasos', 'Fuente', 'Imagen'],
      recommendations: []
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
          this.findRecommendations()
          break
        case 3:
          this.deleting = true
          this.findRecommendations()
          break
      }
    },
    async createNewRecommendation () {
      const recommendation = this.newRecommendation
      try {
        const response = await axios.post('/private/recommendations', recommendation, {
          headers: this.$store.getters.getHeader
        })
        if (response.data && response.status === 201) {
          this.reseter()
          await this.findRecommendation()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async findRecommendations () {
      this.$store.dispatch('changeLoadingState')
      const recommendations = await axios.get('/recommendations')
      this.$store.dispatch('changeLoadingState')
      this.recommendations = recommendations.data
    },
    async deleteRecommendation (recommendation) {
      try {
        const response = await axios.delete('/private/recommendations/' + recommendation._id, {
          headers: this.$store.getters.getHeader
        })
        if (response.status === 204) {
          await this.findRecommendations()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    selectToUpdate (recommendation) {
      this.selected = true
      this.newRecommendation = recommendation
      this.numberOfParagraphs = recommendation.description.length
      this.numberOfSteps = recommendation.steps.length
    },
    unselectToUpdate () {
      this.reseter()
      this.editing = true
    },
    async updateRecommendation () {
      try {
        const response = await axios.put('/private/recommendations/' + this.newRecommendation._id, this.newRecommendation, {
          headers: this.$store.getters.getHeader
        })
        if (response.data === 200) {
          this.reseter()
          await this.findRecommendations()
        }
      } catch (error) {
        if (error.response.status) this.$router.push('/logout')
      }

      this.unselectToUpdate()
    },
    reseter () {
      this.newRecommendation = {
        title: '',
        description: [],
        steps: [],
        source: '',
        image: ''
      }
      this.numberOfParagraphs = null
      this.numberOfSteps = null
      this.selected = false
    }
  },
  async mounted () {
    await this.findRecommendations()
  }
}
</script>

<style scoped>
#container {
  margin-top: 140px;
}

#actions {
  background: white;
  position: fixed;
  width: 100%;
}

#content {
  margin-top: 60px;
  position: absolute;
  width: 100%;
  z-index: -10000;
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
