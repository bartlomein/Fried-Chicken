<template>
  <div id="app">
    <Address @send-location="updateLocation"></Address>

    <div v-if="place">
      Place {{place}}
    </div>
  </div>
</template>

<script>
import Address from './components/Address.vue';
import axios from 'axios';

export default {
  name: 'app',
  components: {
    Address
  },
   data() {
     return{
      place: null,
      lat:null,
      lon:null,
      posts:null,
     }
  },
   methods: {
    updateLocation(googlePlace) {
      this.place = googlePlace;
      this.lat = this.place.geometry.location.lat();
      this.lon = this.place.geometry.location.lng();
      console.log(this.lat,this.lon)
    //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY


    }
   },
   watch: {
    // whenever question changes, this function will run
    place: function () {
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
