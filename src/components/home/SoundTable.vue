<template>
    <div>
      <table class='striped centered'>
        <thead>
          <tr>
            <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>
                <div class='waves-effect file-field input-file'>
                  <div class='waves-effect blue btn'>
                    <span>File</span>
                    <input type='file' @change="previewSound" accept='sound/*'/>
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Seleccionar un sonido">
                  </div>
                </div>
                <div class="div" v-if="soundData!=null">
                  <button class='waves-effect green btn' @click="onUpload">Save</button>
                </div>
              </div>
            </td>
              <td>
              </td>
              <td>
              </td>
            <td>
            </td>
          </tr>
          <tr v-for="field of sounds" :key="field.id">
            <td><i class="material-icons red-text" @click="deleteSound(field._id) && deleteFire(field.url)">clear</i></td>
            <td>{{ field._id }}</td>
            <td>{{ field.name }}</td>
            <td>{{ field.url }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import axios from 'axios'

export default {
  template: 'soundtable',
  data () {
    return {
      soundData: null,
      sound: null,
      uploadValue: 0,
      newSound: {
        url: '',
        name: ''
      },
      fields: ['Actions', 'ID', 'Nombre', 'URL'],
      sounds: []
    }
  },
  methods: {
    async createNewSound () {
      const sound = this.newSound
      try {
        const response = await axios.post('/sounds', sound, {
          headers: this.$store.getters.getHeader
        })
        if (response.data && response.status === 201) {
          this.newSound = {
            url: '',
            name: ''
          }
          await this.findSounds()
        }
      } catch (error) {
        if (error.response.status === 401) this.$router.push('/logout')
      }
    },
    async findSounds () {
      try {
        this.$store.dispatch('changeLoadingState')
        const sounds = await axios.get('/private/sounds', {
          headers: this.$store.getters.getHeader
        })
        this.$store.dispatch('changeLoadingState')
        this.sounds = sounds.data
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push('/logout')
        }
      }
    },
    async deleteSound (_id) {
      console.log('EL ID', _id)
      try {
        const sound = await axios.delete('/private/sounds/' + _id, {
          headers: this.$store.getters.getHeader
        })
        if (sound.status === 204) {
          await this.findSounds()
        }
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push('/logout')
        }
      }
    },
    previewSound (event) {
      this.uploadValue = 0
      this.sound = null
      this.soundData = event.target.files[0]
    },
    deleteFire (soundURL) {
      const soundRef = firebase.storage().refFromURL(soundURL)
      soundRef.delete().then(() => {
        console.log('Archivo eliminado con exito de firebase storage')
      }).catch((error) => { console.log(error.message) })
    },
    onUpload () {
      this.sound = null
      const storageRef = firebase.storage().ref(`${this.soundData.name}`).put(this.soundData)
      storageRef.on('state_changed',
        snapshot => {
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, error => { console.log(error.message) },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.sound = url
            this.newSound = {
              url: this.sound,
              name: this.soundData.name
            }
            this.createNewSound()
          })
        }
      )
    }
  },
  async mounted () {
    await this.findSounds()
  }
}
</script>

<style scoped>
table {
  margin-top: 140px;
}

.btn {
  cursor: pointer;
  position: static;
  width: 100px;
}

.div {
  margin-top: 2em;
}

i {
  cursor: pointer;
}

select {
  display: initial;
}
</style>
