<template>
  <div id="app">
    <Address @send-location="updateLocation"></Address>

    
    <div id="results"></div>
  </div>
</template>

<script>
import Address from './components/Address.vue';


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
  
       var request = {
    location: new google.maps.LatLng(this.lat, this.lon),
    radius: '50000',
    keyword: 'boof'
};

    var container = document.getElementById('results');

      var service = new google.maps.places.PlacesService(container);
      service.nearbySearch(request, callback);


    function callback(results, status) {
      console.log(results)
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {

            container.innerHTML += results[i].name + '<br />';
        }
    }
}



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
