<template>
    <v-dialog width="600px" v-model="popUpVisible">

        <v-btn flat slot=activator class="success">
            <span>Add new project</span>
        </v-btn>

        <v-card>
            <v-card-title><h2>Add new project</h2></v-card-title>

            <v-card-text>
                <v-form class="px-3">
                    <v-text-field label="Title" prepend-icon="folder" v-model="title" />
                    <v-textarea label="Information" prepend-icon="edit" v-model="content" />

                    <v-menu>
                        <v-text-field label="Due date" prepend-icon="date_range" slot="activator" v-model="formattedDate"/>
                        <v-date-picker v-model="due">

                        </v-date-picker>
                    </v-menu>
                    <v-spacer/>

                    <v-btn flat class="success ma-1 mt-3" @click="submitForm" :loading="loading">
                        <span>Add project</span>
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format';
import db from '../fb';

export default {
    data(){
        return{
            title: "",
            content: "",
            due:"",
            loading: false,
            popUpVisible: false
        }
    },
    methods: {
        submitForm(){
            this.loading = true;
            const project = {
                title: this.title,
                content: this.content,
                due_date: this.due,
            }

            db.collection('projects').add(project).then(() => {
                this.loading = false;
                this.popUpVisible = false;
                this.$emit('projectAdded');
            })

        }       
    },
    computed: {
        formattedDate(){
            if(this.due){
                return format(this.due, 'Do MMM YYYY');
            }
            else{
                return "";
            }
        }
    },
}
</script>

