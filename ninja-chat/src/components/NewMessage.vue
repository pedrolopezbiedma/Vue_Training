<template>
    <div class="new-message">
        <form @submit.prevent="addMessage">
            <label for="new-message">New Message (enter to add): </label>
            <input type="text" name="new-message" v-model="newMessage">
            <p class="red-text" v-if="feedback"> {{ feedback }}</p>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name:'NewMessage',
    props: ['filledName'],
    data(){
        return{
            newMessage: null,
            feedback: null
        }
    },
    methods: {
        addMessage(){
            if(this.newMessage){
                db.collection('messages').add({
                    name: this.filledName,
                    content: this.newMessage,
                    timestamp: Date.now()
                })
                .catch(err =>{
                    console.log(err);
                })
                this.feedback = null
                this.newMessage = null
            }
            else{
                this.feedback = 'You must enter a message in order to send it.!'
            }
            
        }
    }
}
</script>