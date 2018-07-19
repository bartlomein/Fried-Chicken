<template>
<div id="app">
    <div id="logo"></div>
    <div id = "update"> <button @click="refresh"> </button> </div>
    <div id="chicken-bg">
        <img src="./assets/chicken-bg.png" alt="" srcset="">
    </div>
    <div id="search">
        <Address @send-location="updateLocation"></Address>
    </div>
    <div id="map-and-results">
        <div id="map">
        </div>

        <div id="results" >
            <div id="all-the-spots" v-for="placeone in placesArray" :key="placeone.id">
                <div id="one-spot">
                    <Spots :places.sync="placeone"></Spots>

            </div>
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
  mounted(){
    console.log("app mounted");
  },
  watch:{
    place(){
      console.log("array changed");
      this.$forceUpdate();

      
      this.place.lat = this.place.geometry.location.lat();
      this.place.lon = this.place.geometry.location.lng();
      let vm = this;
      let request = {
        location: new google.maps.LatLng(this.place.lat, this.place.lon),
        radius: "3000",
        keyword: "chicken"
      };

      let container = document.getElementById("results");

      let service = new google.maps.places.PlacesService(container);

      service.nearbySearch(request, callback);

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          vm.$nextTick(function(){
            vm.placesArray = results;
            console.log("next tick");
          })
          
          console.log(vm.placesArray);

          vm.toggleDetail();
        }
      }
    }
  },
  methods: {
    updateLocation(googlePlace) {
      console.log(googlePlace);
      this.place = googlePlace;
      //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
    },
    refresh(){
     this.$forceUpdate();
    },
    toggleDetail() {
      var map;
      var infowindow;
      let vm = this;

      function initMap() {
        var pyrmont = { lat: vm.place.lat, lng: vm.place.lon };

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
body{
  background-color:#2176AE;
}
#app {

  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;


  height: 100%;

}
#map-and-results{
  display:grid;
  grid-template-columns: 400px auto;
}
#search{
  padding-bottom:20px;
}
#map {
  height: 600px;
  width: 400px;

}


/*results grid*/
#results{

  display: flex;

  padding-left:50px;


}
#one-spot{
  background-color:#fcfcfc;
  padding:5px;
  height:100px;
  width:200px;
  opacity: 0.98;
  border-radius: 10px;
  box-shadow: 2px 2px 20px black;
}

#all-the-spots{
  width:70%;
  border-radius:10px;

  padding:5px;
  margin:10px;
}
#chicken-bg img{
  position:relative;



}
#chicken-bg img{
  width:100%;
  position:absolute;
    top:0;
  right:0;
  z-index: -1;
}

</style>
