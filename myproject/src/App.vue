<template>
  <div id="app">
    <h1> {{ title }}</h1>
    <NavBar />
    <Blogs />
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import Blogs from './components/Blogs';

export default {
  name: 'app',
  components: {
    NavBar: NavBar,
    Blogs: Blogs
  },
  data(){
    return {
      title: "My First app :D"
    }
  }
}
</script>

<style>
h1{
  color: #444;
  font-weight: normal;
  text-align: center; 
}
</style>
