<template>
    <nav>
    <v-toolbar flat app >
        <v-icon color="grey" @click="navigationDisplayed= !navigationDisplayed">menu</v-icon>
        <v-toolbar-title class="grey--text text-uppercase">
            <span>xnail</span>
            <span class="font-weight-black">Dev</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu offset-y>
            <v-btn flat slot="activator" color=grey>
                <v-icon left>expand_more</v-icon>
                <span>Menu</span>
            </v-btn>
            <v-list>
                <v-list-tile v-for="link in links" :key="link.id" router :to="link.route">
                    <v-list-tile-title> {{ link.text }} </v-list-tile-title>
                </v-list-tile>
            </v-list> 
        </v-menu>

        <v-snackbar v-model="snackbarDisplayed" timeout='4000' color=success>
            <span>Awesome!!! You've created a new project!!!</span>
            <v-btn flat @click="snackbarDisplayed = !snackbarDisplayed">
                <span>Close</span>
            </v-btn>
        </v-snackbar>

        <v-btn flat color=grey>
            <span>Sign Out</span>
            <v-icon right>exit_to_app</v-icon>
        </v-btn>
    </v-toolbar>
    
     <v-navigation-drawer v-model="navigationDisplayed" app class="indigo">
         <v-layout column align-center>
             <v-flex>
                 <v-avatar size=100 class="mt-5">
                     <img src="avatar-2.png" alt="">         
                </v-avatar>
                <div class="subheading mt-1 ml-3 white--text">Xnail Dev</div> 
             </v-flex>
             <v-flex class="mt-4 mb-3">
                 <PopUp @projectAdded="snackbarDisplayed = !snackbarDisplayed"/>
             </v-flex>
         </v-layout>

        <v-list>
            <v-list-tile v-for="link in links" :key="link.id" router :to="link.route">
                <v-list-tile-action >
                    <v-icon class="white--text"> {{ link.icon }} </v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="white--text"> {{ link.text }} </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
     </v-navigation-drawer>
    </nav>
</template>

<script>
import PopUp from './Popup';
export default {
    data(){
        return{
            navigationDisplayed: false,
            snackbarDisplayed: false,
            links: [
                { id:1, icon: 'dashboard', text: 'Dashboard', route: '/' },
                { id:2, icon: 'folder', text: 'My Projects', route: '/projects' },
                { id:3, icon: 'person', text: 'Team', route: '/teams' },                                
            ]
        }
    },
    components:{
        PopUp
    }
}
</script>

<style>

</style>
