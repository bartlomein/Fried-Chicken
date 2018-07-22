<template>
<div id="app">
    <div id="logo"> </div>

    <!-- <div id="chicken-bg">
        <img src="./assets/chicken-bg.png" alt="" srcset="">
    </div> -->
    <div id="search">
        <Address @send-location="updateLocation"></Address>
    </div>
    <fade-transition  >
    <div id="map-and-results" v-show="tran">
       
        <div id="map">
        </div>
        

        <div id="results" >
            
               
                <div id="one-spot" v-for="placeone in placesArray" :key="placeone.place_id" >
                    <Spots :places.sync="placeone" ></Spots>
                </div>
        </div>
       
       
    </div>
     </fade-transition >
  



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
      tran: false
    };
  },
  mounted() {},
  watch: {
    place() {
      this.tran = false;
      this.placesArray = null;
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
          vm.$nextTick(function() {
            let newArray = [];
            for (let index = 0; index < results.length; index++) {
              if (results[index].opening_hours) {
                newArray.push(results[index]);
              }
            }

            let newerArray = [];
            for (let index = 0; index < newArray.length; index++) {
              if (newArray[index].opening_hours.open_now != null) {
                newerArray.push(newArray[index]);
              }
            }

            console.log(newerArray);
            vm.placesArray = newerArray;
            vm.tran = true;
          });

          vm.toggleDetail();
        }
      }
    }
  },
  methods: {
    updateLocation(googlePlace) {
      this.place = googlePlace;
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
        let newArray = [];
        for (let index = 0; index < results.length; index++) {
          if (results[index].opening_hours) {
            newArray.push(results[index]);
          }
        }

        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let newArray = [];
          for (let index = 0; index < results.length; index++) {
            if (results[index].opening_hours) {
              newArray.push(results[index]);
            }
          }

          let newerArray = [];
          for (let index = 0; index < newArray.length; index++) {
            if (newArray[index].opening_hours.open_now != null) {
              newerArray.push(newArray[index]);
            }
          }

          for (var i = 0; i < newerArray.length; i++) {
            createMarker(newerArray[i]);
          }
        }
      }

      function createMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon:
            "https://www.shareicon.net/data/32x32/2016/08/26/820443_food_512x512.png"
        });

        google.maps.event.addListener(marker, "click", function() {
          infowindow.setContent(
            "<div><strong>" +
              place.name +
              "</strong><br>" +
              "Rating: " +
              place.rating
          );

          infowindow.open(map, this);
        });
      }
      initMap();
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Trirong");
body {
  background-color: #f7fff7;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#map-and-results {
  display: grid;
  grid-template-columns: 400px auto;
}
#search {
  padding-bottom: 20px;
}
#map {
  height: 400px;
  width: 400px;
}

/*results grid*/
#results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-template-rows: minmax(50px, auto);
  grid-gap: 50px;
  grid-gap: 20px;
  padding-left: 50px;
}

#one-spot {
}

#all-the-spots {
  width: 70%;
  border-radius: 10px;

  padding: 5px;
  margin: 10px;
}
#chicken-bg img {
}
#chicken-bg img {
  width: 100%;

  top: 0;
  right: 0;
  z-index: -1;
}
@keyframes happychicken {
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  to {
    transform: scale(1);
  }
}

.rating-on-card {
  position: relative;
  font-size: 50px;
  z-index: 10;
  font-family: "Trirong", serif;
  color: white;
  font-weight: bold;
}
.rating-on-card img {
  position: absolute;
  top: 10px;
  right: 25px;
  z-index: -1;
  width: 20%;
  animation: happychicken 1.7s infinite;
}
.rating-on-card img:hover {
}
</style>
