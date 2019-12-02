<template>
    <div>
        <table class="table mt-4">
        <thead>
            <tr>
            <th scope="col">User ID</th>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="post in posts" :key="post.id">
            <td>{{ post.userId }}</td>    
            <td>{{ post.id }}</td>
            <td>{{ post.title}}</td>
            <td>{{ post.body }}</td>
            </tr>               
        </tbody>
        </table>
    </div>
</template>
<script>
// External Libraries
import axios from 'axios';

export default {
    name: 'Posts',
    data(){
        return {
            posts: [ ]
        }
    },
    created(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            // handle success
            this.posts = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
}
</script>

<style>

</style>
