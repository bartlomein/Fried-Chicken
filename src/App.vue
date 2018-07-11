<template>
  <div id="app">
    <Address @send-location="updateLocation"></Address>
    <div id = "all-the-spots" v-for="place in placesArray">
    <Spots :places="place"></Spots>
    </div>
    <div id="results"></div>
  </div>
</template>

<script>
import Address from "./components/Address.vue";
import Spots from "./components/Spots.vue";

export default {
  name: "app",
  components: {
    Address,
    Spots
  },
  data() {
    return {
      place: null,
      lat: null,
      lon: null,
      placesArray: null
    };
  },
  methods: {
    updateLocation(googlePlace) {
      this.place = googlePlace;
      this.lat = this.place.geometry.location.lat();
      this.lon = this.place.geometry.location.lng();
      let vm = this;

      let request = {
        location: new google.maps.LatLng(this.lat, this.lon),
        radius: "4000",
        keyword: "chicken"
      };

      let container = document.getElementById("results");

      let service = new google.maps.places.PlacesService(container);

      service.nearbySearch(request, callback);



      function callback(results, status, placesArray1) {

          
        if (status == google.maps.places.PlacesServiceStatus.OK) {

          vm.placesArray = results;
          console.log(vm.placesArray)
         
        }
        
        
      }
      console.log(placesArray);
      //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
    }
  },
  watch: {
    // whenever question changes, this function will run
    place: function() {}
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
