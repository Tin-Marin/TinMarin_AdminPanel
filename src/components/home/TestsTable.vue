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
            <input type="text" placeholder="Pregunta" v-model="newTest.question" required>
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <input type="number" placeholder="Número áreas de educación" v-model.number="numberOfEducationAreas" required>
          </div>
          <div class="col s9">
            <div v-for="(element, index) in numberOfEducationAreas" :key="index">
              <select v-model="newExhibition.educationArea[index]" required>
                <option v-for="(element, index) in educationAreas" :key="index" :value="element.name">{{element.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <a v-if="creating" class="waves-effect green btn" @click="createNewExhibition">save</a>
        <a v-if="editing" class="waves-effect grey btn" @click="unselectToUpdate">back</a>
        <a v-if="editing" class="blue darken-2 btn" @click="updateExhibition">save</a>
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
          <tr v-show="deleting || (editing && !selected)" v-for="field of tests" :key="field._id">
            <td>
              <i v-if="editing" class="material-icons" @click="selectToUpdate(field)">create</i>
              <i v-if="deleting" class="material-icons red-text" @click="deleteExhibition(field)">clear</i>
            </td>
            <td>{{ field._id }}</td>
            <td>{{ field.question }}</td>
            <td>{{ field.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  template: 'testtable',
  data () {
    return {
      creating: false,
      editing: false,
      deleting: false,
      selected: false,
      numberOfEducationAreas: null,
      newTest: {
        question: '',
        educationArea: []
      },
      fields: ['ID', 'Nombre', 'Áreas de educación'],
      educationAreas: [],
      tests: []
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
          this.findTests()
          break
        case 3:
          this.deleting = true
          this.findTests()
          break
      }
    },
    async retrieveEducationAreas () {
      const response = await axios.get('/education-areas')
      if (response.status === 200) this.educationAreas = response.data
    },
    verifyEducationAreas () {
      const fixedArray = this.newTest.educationArea.filter((value, index) => {
        return this.newTest.educationArea.indexOf(value) === index
      })
      this.numberOfEducationAreas = fixedArray.length
      this.newTest.educationArea = fixedArray
    },
    async createNewTest () {
      try {
        this.verifyEducationAreas()
        const test = this.newTest
        const response = await axios.post('/private/tests', test, {
          headers: this.$store.getters.getHeader
        })
        if (response.data && response.status === 201) {
          this.reseter()
          await this.findTests()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async findTests () {
      this.$store.dispatch('changeLoadingState')
      const tests = await axios.get('/tests')
      this.$store.dispatch('changeLoadingState')
      this.tests = tests.data
    },
    async deleteTest (test) {
      try {
        const response = await axios.delete('/private/tests/' + test._id, {
          headers: this.$store.getters.getHeader
        })
        if (response.status === 204) {
          await this.findTest()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    selectToUpdate (test) {
      this.selected = true
      this.newTest = test
      this.numberOfSponsors = test.sponsorName.length
      this.numberOfLogos = test.sponsorLogo.length
      this.numberOfEducationAreas = test.educationArea.length
    },
    unselectToUpdate () {
      this.reseter()
      this.editing = true
    },
    async updateTest () {
      try {
        const response = await axios.put('/private/tests/' + this.newtest._id, this.newtest, {
          headers: this.$store.getters.getHeader
        })
        if (response.data === 200) {
          this.reseter()
          await this.findEducationAreas()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
      this.unselectToUpdate()
    },
    reseter () {
      this.newTest = {
        name: '',
        educationArea: []
      }
      this.numberOfEducationAreas = null
      this.selected = false
    }
  },
  async mounted () {
    await this.findTests()
    await this.retrieveEducationAreas()
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

select {
  display: initial;
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
