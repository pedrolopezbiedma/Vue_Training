<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link class="brand-logo left" :to="{ name: 'gmap' }">GeoNinjas!</router-link>
        <ul class="right">
          <li v-if="!loggedUser"><router-link :to="{ name:'signup' }">Signup</router-link></li>
          <li v-if="!loggedUser"><router-link :to="{ name:'login' }">Login</router-link></li>
          <li v-if="loggedUser"><a> {{ loggedUser.email }}</a></li>
          <li v-if="loggedUser"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data(){
    return {
      loggedUser: null
    }
  },
  created(){
    // Checking if the user is logged or not, to display navbar links accordingly.
    firebase.auth().onAuthStateChanged(() => {
      this.loggedUser = firebase.auth().currentUser
      console.log(this.loggedUser)
    })

  },
  methods: {
    logout(){
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'login'})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>