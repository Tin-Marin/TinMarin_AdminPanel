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
            <a class="waves-effect green btn" @click="createNewRecommendedWebsite">save</a>
          </td>
          <td>
          </td>
          <td><input type="text" placeholder="URL" v-model="newRecommendedWebsite.url" required></td>
          <td><input type="text" placeholder="Imagen" v-model="newRecommendedWebsite.image" required></td>
          <td><input type="text" placeholder="Título" v-model="newRecommendedWebsite.title" required></td>
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
            <a @click="startEditing"><i class="material-icons black-text">arrow_back</i></a>
            <br>
            <a @click="updateRecommendedWebsite(field)"><i class="material-icons green-text">check</i></a>
            <br>
            <a @click="deleteRecommendedWebsite(field)"><i class="material-icons red-text">clear</i></a>
          </td>
          <td>{{ field._id }}</td>
          <td><input v-model="field.url" /></td>
          <td><input v-model="field.image" /></td>
          <td><input v-model="field.title" /></td>
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
      newRecommendedWebsite: {
        url: '',
        image: '',
        title: ''
      },
      fields: ['Actions', 'ID', 'URL', 'Imagen', 'Título'],
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
      try {
        const recommendedWebsite = this.newRecommendedWebsite
        const response = await axios.post('/private/recommended-websites', recommendedWebsite, {
          headers: this.$store.getters.getHeader
        })
        if (response.data && response.status === 201) {
          this.newRecommendedWebsite = {
            url: '',
            image: '',
            title: ''
          }
          await this.findRecommendedWebsites()
        }
      } catch (error) {
        if (error.response.status) this.$router.push('/logout')
      }
    },
    async findRecommendedWebsites () {
      this.$store.dispatch('changeLoadingState')
      const recommendedWebsites = await axios.get('/recommended-websites')
      this.$store.dispatch('changeLoadingState')
      this.recommendedWebsites = recommendedWebsites.data
    },
    async updateRecommendedWebsite (recommendedWebsite) {
      try {
        const newRecommendedWebsite = {
          url: recommendedWebsite.url,
          image: recommendedWebsite.image,
          title: recommendedWebsite.title
        }
        const response = await axios.put('/private/recommended-websites/' + recommendedWebsite._id, newRecommendedWebsite, {
          headers: this.$store.getters.getHeader
        })
        if (response === 200) {
          await this.findRecommendedWebsites()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async deleteRecommendedWebsite (recommendedWebsite) {
      try {
        const response = await axios.delete('/private/recommended-websites/' + recommendedWebsite._id, {
          headers: this.$store.getters.getHeader
        })
        if (response.status === 204) {
          await this.findRecommendedWebsites()
        }
      } catch (error) {
        if (error.response.status) this.$router.push('/logout')
      }
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

.btn {
  cursor: pointer;
  position: inherit;
  width: 100px;
}

i {
  cursor: pointer;
}
</style>
