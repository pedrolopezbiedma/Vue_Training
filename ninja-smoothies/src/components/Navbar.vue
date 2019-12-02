<template>
    <div class="navbar">
        <nav class="nav-extended indigo darken-2">
            <div class="nav-content">
                <router-link :to="{ name: 'Index' }">
                    <span class="nav-title" :click="goHome">Xnail Smoothies</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab pink">
                    <router-link :to="{ name: 'AddSmoothie' }">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name:'Navbar',
    data(){
        return{

        }
    },
    methods: {
        goHome(){
            this.$router.push({ name: 'Index' })
        }
    }
}
</script>

<style>
.navbar nav{
    padding: 0 20px;
}
</style>
