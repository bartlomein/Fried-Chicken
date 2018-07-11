<template>
  <div id="app">
    <div id = "search">
      <Address @send-location="updateLocation"></Address>
    </div>
    <div id="results"></div>
      <div id = "all-the-spots" v-for="(place, key, index) in placesArray">
          <div id = "one-spot">
        <Spots :places="place"></Spots>
        
          <button>MORE</button>
          <Detail :places="place"></Detail>
          </div>
        </div>
      </div>    
  </div>
</template>

<script>
import Address from "./components/Address.vue";
import Spots from "./components/Spots.vue";
import Detail from "./components/Detail.vue";

export default {
  name: "app",
  components: {
    Address,
    Spots,
    Detail
  },
  data() {
    return {
      place: null,
      lat: null,
      lon: null,
      placesArray: null,
      showDetail: false
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

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          vm.placesArray = results;
          
        }
      }

      //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
    },
    toggleResults(){
      this.showResults = !this.showResults;
      
    },
    toggleDetail(){
      this.showDetail = !this.showDetail;
      console.log(this.showDetail)
    },
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
