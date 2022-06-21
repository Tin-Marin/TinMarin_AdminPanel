<template>
    <div>
        <loader v-if="isLoading" />
        <div>
            <input type="file" @change="previewSound" accept="sound/*">
        </div>
        <div>
            <p>Progress: {{ uploadValue.toFixed() + "%" }}
                <progress id="progress" :value="uploadValue" max="100"></progress>
            </p>
        </div>
        <div v-if="soundData != null">
            <button @click="onUpload">Subir</button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app'

export default {
  template: 'soundtable',
  data () {
    return {
      soundData: null,
      sound: null,
      uploadValue: 0
    }
  },
  methods: {
    previewSound (event) {
      this.uploadValue = 0
      this.sound = null
      this.soundData = event.target.files[0]
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
          storageRef.snapshot.ref.getDownloadURL().then((url) => { this.sound = url })
        }
      )
    }
    /*  startEditing () {
            if (this.editing) {
                this.editing = false
            } else {
                this.editing = true
            }
        },
        async createNewSound() {
            try{
                const storage = firebase.getStorage()
                const storageRef = ref(storage, this.newSound)
                const storageSoundRef = ref(storage, 'sounds/'+this.newSound)
                storageRef.name === storageSoundRef.name
                storageRef.fullPath === storageSoundRef.fullPath
            } catch (error) {
                if (error.response.status === 401) this.$router.push('/logout')
            }
        } */
  }
}
</script>
