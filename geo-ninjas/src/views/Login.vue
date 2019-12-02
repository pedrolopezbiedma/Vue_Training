<template>
    <div class="container login">
        <form class="card-panel" @submit.prevent="login">
            <h2 class="deep-purple-text center">Login</h2>
            <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p class="center red-text" v-if="feedback"> {{ feedback }} </p>
            <div class="center field">
                <button class="btn deep-purple">Login</button>
            </div>            
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name:'Login',
    data(){
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login(){
            if(this.email && this.password){
                this.feedback = null;
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(credentials => {
                        this.$router.push({name: 'gmap'})
                    })
                    .catch(error => {
                        this.feedback = error.message
                        console.log(error)
                    })
            }
            else{
                this.feedback = 'Please fill all the fields'
            }
        }
    }
}
</script>

<style>
    .login{
        max-width: 400px;
        margin-top: 60px;
    }
    .login h2{
        font-size: 2.4em;
    }

    .login .field{
        margin-bottom:16px;
    }
</style>
