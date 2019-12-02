<template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'GMap',
    data(){
        return {
            lat: 53,
            lng: -2
        }
    },
    mounted(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude,
                this.lng = position.coords.longitude
                this.renderMap()

                // Updating the geolocation for the logged user.
                let ref = db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid)
                ref.get()
                    .then(snapshot => {
                        console.log(snapshot)
                        snapshot.forEach(doc => {
                            db.collection('users').doc(doc.id).update({
                                geolocation: {
                                    latitude: this.lat,
                                    longitude: this.lng
                                }
                            })
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            error => {
                console.log(error)
            },
            {
                maximumAge: 60000,  // Cached geolocation within 1h
                timeout: 3000       // Timeout to find geolocation
            })
        }
        else{
            this.renderMap();
        }
    },
    methods: {
        renderMap(){
            // Creating & Rendering the map itself
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng},
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            })

            // Creating the different Markers
            let ref = db.collection('users').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let data = doc.data()
                        if(data.geolocation){
                            let marker = new google.maps.Marker({
                                position: { lat: data.geolocation.latitude, lng: data.geolocation.longitude },
                                map: map
                            })
                            marker.addListener('click', () => {
                                this.$router.push({ name: 'viewProfile', params: { user_id: doc.id }})
                            })                           
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },

}
</script>

<style>
    .google-map{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>
