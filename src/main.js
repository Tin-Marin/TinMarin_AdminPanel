import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'
import axios from 'axios'
import firebase from 'firebase/compat/app'
//  import 'firebase/compat/storage'
//  import 'firebase/compat/auth'
//  import * as firebaseui from 'firebaseui'
//  import 'firebaseui/dist/firebaseui.css'
//  import VueExcelXlsx from 'vue-excel-xlsx'

axios.defaults.baseURL = 'https://tin-marin-app-v2.herokuapp.com/api/v1'

firebase.initializeApp({
    apiKey: 'AIzaSyD7VhRao2b7IJDSI_0r3HQCGvNFKqDaBoU',
    authDomain: 'tinmarinapp-32b99.firebaseapp.com',
    projectId: 'tinmarinapp-32b99',
    storageBucket: 'tinmarinapp-32b99.appspot.com',
    messagingSenderId: '214238575612',
    appId: '1:214238575612:web:2753e475e691df446a1079',
    measurementId: 'G-RHG6SQSGJE'
})

createApp(App).use(router).use(store).mount('#app')
//   createApp(App).use(router).use(store).use(VueExcelXlsx).mount('#app')
