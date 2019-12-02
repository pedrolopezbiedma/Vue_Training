<template>
    <div class="sign-up container">
        <form class="card-panel" @submit.prevent="signUp">
            <h2 class="center deep-purple-text">Welcome</h2>
            <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="alias">Alias</label>
                <input type="text" name="alias" v-model="alias">
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p class="center red-text" v-if="feedback"> {{ feedback }} </p>
            <div class="center field">
                <button class="btn deep-purple">Sign Up</button>
            </div>

        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name:'Signup',
    data(){
        return {
            email: null,
            alias: null,
            password: null,
            slug: null,
            feedback: null,
            
        }
    },
    methods: {
        signUp(){
            // Check if fields are filled.
            if(this.alias){
                // If they are, Slugify the alias to generate slug
                this.slug = slugify(this.alias, {
                    replacement: '-',                   // replace spaces with replacement
                    remove: /[$*_+~.()'"!\-:@]/g,       // regex to remove characters
                    lower: true                         // result in lower case
                })
                
                // Check on firestore if alias already exist.
                let ref = db.collection('users').doc(this.slug)
                ref.get()
                    .then(doc => {
                        if(doc.exists){
                            this.feedback = 'The alias is already taken.'
                        }
                        else{
                            // Alias is not taken, so we need to really register the new user.
                            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                                .then(credentials => {
                                    // Now that we're registered the user in Firebase, we need to set the record for him in firestore.
                                    ref.set({
                                        alias: this.alias,
                                        geolocation: null,
                                        user_id: credentials.user.uid                                       
                                    })
                                    .then(() => {
                                        this.$router.push({ name: 'gmap'})
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        this.feedback = error.message
                                    })

                                })
                                .catch(error => {
                                    console.log(error);
                                    this.feedback = error.message
                                })
                        }
                    })

            }
            else{
                this.feedback = 'You must fill all fields.'
            }
        }
    }
}
</script>

<style>
    .sign-up{
        max-width: 400px;
        margin-top: 60px;
    }
    .sign-up h2{
        font-size: 2.4em;
    }
    .sign-up .field{
        margin-bottom: 16px;
    }
</style>
