<template>
    <div>
        <h2> {{ blogTitle }} </h2>
        <input type="text" v-model="searchInput">
        <ul v-for="post in filteredPosts" :key='post.id'>
            <h3> {{ post.title }}</h3>
            <p> {{ post.body | filterBody }}</p>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Blogs',
    data(){
        return{
            blogTitle: 'Posts',
            searchInput: '',
            posts: []
        }
    },
    methods: {

    },
    computed: {
        filteredPosts(){
            return this.posts.filter(post => {
                return post.title.match(this.searchInput)
            })
        }
    },
    created(){
        // Getting the posts.
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            console.log(response.data);
            this.posts = response.data;
        })
        .catch(error => {
            console.log(error);
        })
    }
}
</script>

<style>

</style>
