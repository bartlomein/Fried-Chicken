<template>
<div id="app">
    <div id="logo-and-search">
        <div id="logo">
            <div id="sub-logo">
                <a href="./">
                    <h1>friedchicken.app</h1>
                </a>
            </div>
        </div>
        <div id="search">
            <Address @send-location="updateLocation"></Address>
        </div>
    </div>
    <div class="copy-text">
        <h1>
            Welcome to
            <span class="yellow">friedchicken.app!</span>
        </h1>
        <h2>Find your new favorite chicken spot by putting in your address up top!</h2>
    </div>
    <div id="chicken-bg">
        <img src="./assets/chicken-sammich-4.png" alt="" srcset="">
    </div>
    <fade-transition>
        <div id="map-and-results" v-show="tran">
          <div id="results">
                <div id="one-spot" v-for="placeone in placesArray" :key="placeone.place_id">
                    <Spots :places.sync="placeone"></Spots>
                </div>
            </div>
          <div id="map">
            </div>

            
            
        </div>
    </fade-transition>
    <div class="footer">Made with love for chicken and Vue by <a href ="https://github.com/bartlomein/Fried-Chicken">Me</a> </div>


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
  

  margin: 0px;
  background-color: #E63946;
  position: relative;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.footer{
  font-weight:bold;
   position: fixed;
    bottom: 0;
    width: 100%;
    color:white;
    background-color:#E63946;
    height: 30px;
    border-radius: 3px 3px 0px 0px

}
.footer a{
  text-decoration: none;
  color:#FFCA3A;
}
#map-and-results {
 
}

#logo-and-search{
  display: grid;
  grid-template-columns: 2fr 2fr;
  align-items: center;
  justify-content: center;
  margin-bottom:20px;


}
#search {
  margin-right:0px; 

}
#search input{
  margin-left:20px;
  margin-right:auto;
  float: right
}
#map {
  height: 400px;
width: 400px;
  float:left;
  box-shadow: 5px 4px 30px black;
}
#enter-address{
  text-align: center;
  padding:0px 20px 0px 20px;
}

/*results grid*/
#results {
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); */


  box-shadow: 5px 4px 30px black;
  background-color:#FFF8F1;
  float:right;
  padding:20px;
  width: 65%;


  
}
.yellow{
  color:#FFCA3A;
}
#logo{
  text-align:left;
}
#logo h3{
  margin:5px;
}
#main-logo{
  color:#70C1B3;
}
#sub-logo h1{
  margin:20px;
  font-size:40px;
  color:#FEC94A;
}
#sub-logo a{
  text-decoration: none;
}
#one-spot {

max-height: 50px;
  align-items:center;
}

.copy-text{

  color:#1D3557;
  text-align:left;
  background-color:#FFF8F0;
  width:90%; 
  max-width: 90%;
  padding:20px;
  z-index: -1;
  position:absolute;
}

.copy-text h1{
  font-size:65px;
  font-weight: bold;
}
.copy-text h2{
  font-size:20px;
}
#all-the-spots {
  width: 70%;


  padding: 5px;
  margin: 10px;
}
#chicken-bg{
  position:absolute;
  top:0px;
  right:0px;
  
  
  z-index: -1;
}
#chicken-bg img {
  float:right;
  width: 97%;
    top: 0px;
  right: 0;
  
  z-index: -1;
}



/*MEDIA QUERIES*/
@media only screen and (max-width: 1360px){
  .copy-text h1{
    max-width: 60%;
  }

}
@media only screen and (max-width: 1300px){


  #chicken-bg img {
    width:90% !important;
  }
    .copy-text h1{
      font-size:58px;
    }

  }
@media only screen and (max-width: 1257px){

  #results{
    width:94%;
    
  }
  #map{
    width:80%;
    margin:50px auto !;
  }
  #chicken-bg img {
    width:80% !important;
  }
    

  }
@media only screen and (max-width: 1200px){
  #search input{
    width:90%;}
    #map, #results{
     float: none;
    display: block; 
    
  }
  #map{
    margin:50px  auto !important ;
  }
  #results{
    margin: 0 auto !important;
  }
  .copy-text{
    width:72%;
  }
  .copy-text h1{
    max-width:60%;
  }
    

  }

@media only screen and (max-width: 1130px){
   .copy-text h2{
    font-size:16px;
  }
    

  }

@media only screen and (max-width: 990px){
#map-and-results{
  display: inline;
}
  #map{
  
  }
   #chicken-bg img {
    width:60% !important;
  }
  .copy-text{
    width:80%;
  }
}

@media only screen and (max-width: 900px){
  #sub-logo h1{
    font-size:20px;
    

  }
  #logo{
  max-width: 50%;
}
#chicken-bg{
  top:40px;
}
  #chicken-bg img{
    width: 60% !important;
  }
  .copy-text h1{
    font-size:50px;
  }
  .copy-text h2{
    max-width:70%;
  }
  #search input{
    width:85%;
  }
    .copy-text{
    width: 72%;
    
  }
  
}
@media only screen and (max-width: 800px){
  .copy-text h1{
    max-width:50%;
    

  }
  
  
}
@media only screen and (max-width: 753px){
  .copy-text h1{
    font-size:36px;
    

  }
  
  
}

@media only screen and (max-width: 650px){
 #chicken-bg img{
    max-width:50% !important;
    top:50px;
  }
  }

@media only screen and (max-width: 600px){
  #sub-logo h1{
    font-size:20px;
    

  }
  #search input{
    width:100%;
    }
  #logo{
  max-width: 50%;
}
#chicken-bg{
  top:30px;
}
  #chicken-bg img{
    width:42% !important;
    top:50px;
  }
  .copy-text h1{
    font-size:40px;
  }
  .copy-text{
    width: 100%;
    max-width: 92%;
  }
  

  
}
@media only screen and (max-width: 550px){
  #chicken-bg {

    top:300px;
  }
  #chicken-bg img{
    width:60% !important;
  }
  .copy-text h1{
    max-width: 94% !important; 
  }
  

  
}
@media only screen and (max-width: 500px){

  #sub-logo a h1{
    font-size:14px;
    margin: 10px;
  }
  #one-spot{
    max-height: 100px;
  }
  #map, #results{
     max-width: 95%;
     
    
  }
  .copy-text h2{
    max-width: 60%;
  }
  .copy-text{
    max-width:80%;
    border-radius: 0px 10px 5px 0px;
  }
  

}
@media only screen and (max-width: 400px){
  #search input{
    width:230px;
    

  }
  #map, #results{
     width:90%;
    
  }
  

}





</style>
