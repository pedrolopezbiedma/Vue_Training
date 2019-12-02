<template>
    <div class="view-profile">
        <h2>View Profile</h2>
        <p>Profile for user {{ userID }}</p>
    </div>
</template>

<script>
export default {
    name: 'ViewProfile',
    data(){
        return{
            userID: this.$route.params.user_id
        }
    },
    methods: {
        updateUserID(){
            this.userID = this.$route.params.user_id;
        }
    },
    watch: {
        $route : 'updateUserID'
    }
}
</script>
