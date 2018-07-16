<template>
  <div id="app">
    <div id="map">
      </div>
    <div id = "search">
      <Address @send-location="updateLocation"></Address>
    </div>
    <div id="results"></div>
      <div id = "all-the-spots" v-for="(place, key, index) in placesArray">
          <div id = "one-spot">
        <Spots  :places="place" ></Spots>
          </div>
        </div>
      </div>    
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
  data: function() {
    return {
      place: null,
      lat: null,
      lon: null,
      placesArray: null,
      showDetail: false,
      image: '.../assets/fried-chicken.png'

    };
  },
  mounted() {},
  methods: {
    updateLocation(googlePlace) {
      this.place = googlePlace;
      this.lat = this.place.geometry.location.lat();
      this.lon = this.place.geometry.location.lng();
      let vm = this;
      let request = {
        location: new google.maps.LatLng(this.lat, this.lon),
        radius: "3000",
        keyword: "chicken",
        rankby: "distance"
      };

      let container = document.getElementById("results");

      let service = new google.maps.places.PlacesService(container);

      service.nearbySearch(request, callback);

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          vm.placesArray = results;
          console.log(vm.placesArray);
          vm.toggleDetail();
        }
      }

      //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
    },
    toggleDetail() {
      var map;
      var infowindow;
      let vm = this;

      function initMap() {
        var pyrmont = { lat: vm.lat, lng: vm.lon };

        map = new google.maps.Map(document.getElementById("map"), {
          center: pyrmont,
          zoom: 12
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: pyrmont,
            radius: 3000,
            keyword: ["chicken"]
          },
          callback
        );
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
        
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: "https://www.shareicon.net/data/32x32/2016/08/26/820443_food_512x512.png"
        });


        

        google.maps.event.addListener(marker, "click", function() {

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Rating: ' + place.rating );
          
          infowindow.open(map, this);

        });
      }
      initMap();
    }
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
#map {
  height: 400px;
  width: 400px;
}
</style>
