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
        <Spots :places="place"></Spots>
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
  data() {
    return {
      place: null,
      lat: null,
      lon: null,
      placesArray: null,
      showDetail: false
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
      var markers = [];
      let vm = this;
      function initialize() {
        var beaches = vm.placesArray

        var map = new google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: new google.maps.LatLng(vm.place.geometry.location.lat(), vm.place.geometry.location.lng()),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        for (var i = 0; i < vm.placesArray.length; i++) {
          var newMarker = new google.maps.Marker({
            position: new google.maps.LatLng(beaches[i][1], beaches[i][2]),
            map: map,
            title: beaches[i][0]
          });

          google.maps.event.addListener(
            newMarker,
            "click",
            (function(newMarker, i) {
              return function() {
                infowindow.setContent(beaches[i][0]);
                infowindow.open(map, newMarker);
              };
            })(newMarker, i)
          );

          markers.push(newMarker);
        }
      }

      initialize();
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
