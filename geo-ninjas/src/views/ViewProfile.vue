<template>
    <div class="view-profile container">
        <div v-if="clickedProfile" class="card">
            <h2 class="deep-purple-text center"> {{ clickedProfile.alias }}'s Wall.</h2>
            <ul class="collection comments">
                <li v-for="(comment, index) in clickedUserComments" :key="index">
                    <div class="deep-purple-text"> {{ comment.from }} </div>
                    <div class="grey-text"> {{ comment.content }} </div>
                </li>
            </ul>
            <form @submit.prevent="addComment">
                <div class="field">
                    <label for="comment">Add a comment</label>
                    <input type="text" name="comment" v-model="newComment">
                    <p v-if="feedback" class="red-text center"> {{ feedback }}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'ViewProfile',
    data(){
        return {
            clickedProfile: null,
            loggedProfile: null,
            newComment: null,
            clickedUserComments: [],
            feedback: null
        }
    },
    created(){
        let ref = db.collection('users').doc(this.$route.params.user_id).get()
            .then(doc => {
                this.clickedProfile = doc.data() // All data
                this.clickedProfile.id = doc.id // slug

                db.collection('comments').where('to', '==', this.clickedProfile.id)
                    .onSnapshot(snapshot => {
                        snapshot.docChanges().forEach(change => {
                            if(change.type == 'added'){
                                this.clickedUserComments.push({
                                    content: change.doc.data().content,
                                    from: change.doc.data().from
                            })
                        }
                    })
                })
            }) 
    },
    methods: {
        addComment(){
            if(this.newComment){
                let ref = db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid)
                ref.get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            this.loggedProfile = doc.data()
                            this.loggedProfile.id = doc.id

                            db.collection('comments').add({
                                content: this.newComment,
                                time: Date.now(),
                                to: this.clickedProfile.id,
                                from: this.loggedProfile.alias
                            })
                            .then(() => {
                                this.newComment = null
                            })
                            .catch(err => {
                                console.log(err)
                            })
                                });
                            })
                            .catch(err => {
                                console.log(err)
                            })
            }
            else{
                this.feedback = 'Please fill the message to post in the wall.'
            }
        }
    }
}
</script>

<style>
    .view-profile .card{
        padding: 20px;
        margin-top: 60px;
    }

    .view-profile h2{
        font-size: 2em;
        margin-top: 0;
    }

    .view-profile li{
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
</style>
