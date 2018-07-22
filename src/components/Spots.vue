<template>
    <div id="spot-container" >
        
        
        <div class = "result-name">{{places.name}}</div>

        
        <div id="results-one">

        </div>
        <div class = "rating">



          <div v-if="places.rating >= 4.5"> <img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""></div>
          <div v-else-if="places.rating > 4.0"> <img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/half-fried-chicken.png" alt="" srcset=""></div>
          <div v-else-if="places.rating > 3.5 && places.rating <=4.0"> <img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""></div>
          <div v-else-if="places.rating > 3.0 && places.rating <=3.5"> <img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/half-fried-chicken.png" alt="" srcset=""></div>
          <div v-else-if="places.rating > 2.5 && places.rating <= 3.0"> <img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""></div>
          <div v-else-if="places.rating > 2.0 && places.rating <=2.5"> <img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/half-fried-chicken.png" alt="" srcset=""></div>
          <div v-else-if="places.rating > 1.5 && places.rating <=2.0"> <img src="../assets/fried-chicken.png" alt="" srcset=""><img src="../assets/fried-chicken.png" alt="" srcset=""></div>
          <div v-else-if="places.rating > 0.5 && places.rating <1.0"> <img src="../assets/fried-chicken.png" alt="" srcset=""></div>
          <div else> </div>

          





          </div>
          <div>
            <div v-if="places.price_level ==1">$</div>
            <div v-else-if="places.price_level ==2">$$</div>
            <div v-else-if="places.price_level ==3">$$$</div>
            <div v-else-if="places.price_level ==4">$$$$</div>
            <div v-else> NA </div>
            
          </div>
        <button class = "place-button button" @click="callModal(), updatePlace()"> More info</button>


        <div id="modal-container">
            <sweet-modal ref="modal" :title="detailedPlace.name">
                <sweet-modal-tab title="Info" id="tab1">
                    <div id="details" v-if="detailedPlace">
                        <div id="typical-info">
                            <div id = "total-rating">
                              <div id="rating-word">Rating: {{detailedPlace.rating}}</div></div>
                              
                            
                            <div id="phone-word">Phone Number:</div>
                            <div id="phoneNumber" @click="callNumber(detailedPlace.formatted_phone_number)">
                                {{detailedPlace.formatted_phone_number}}
                            </div>
                            <div id="address-container" v-if="detailedPlace.adr_address">
                                <div id="address-word">Address:</div>
                                <div id="address" v-html="detailedPlace.adr_address">
                                </div>
                            </div>
                            <div id = "links">
                              <div id = "link-word">Links:</div>
                            <div id = "website" @click="openWebsite(detailedPlace.website)">Website</div>
                            <div id = "website" @click="openWebsite(detailedPlace.url)">Google Maps</div>
                            </div>
                        </div>
                        <div id="hours-container">
                            <div id="hours-of-operation-text" >Hours of Operation:</div>
                            <div id="hours-of-operation" v-for="hour in detailedPlace.opening_hours.weekday_text">
                                {{hour}}
                            </div>
                        </div>

                    </div>
                </sweet-modal-tab>
                <sweet-modal-tab title="Reviews" id="tab2">
                    <div class="reviews-container" v-if="detailedPlace">
                        <div class="review-single" v-for="review in detailedPlace.reviews">

                            <div class="review-chickens">

                                <div class="rating" v-if="review.rating == 1">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                </div>
                                <div class="rating" v-if="review.rating == 2">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                </div>
                                <div class="rating" v-if="review.rating == 3">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                </div>
                                <div class="rating" v-if="review.rating == 4">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                </div>
                                <div class="rating" v-if="review.rating == 5">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                    <img src="../assets/fried-chicken.png" alt="" srcset="">
                                </div>

                            </div>
                            <div class="review-text">
                                {{review.text}}
                            </div>
                            <div class="review-name">
                                - {{review.author_name}}
                            </div>


                        </div>
                    </div>
                </sweet-modal-tab>


            </sweet-modal>
        </div>

    </div>
</template>

<script>
export default {
  props: ["places"],
 
  data: function() {
    return {
      placeId: this.places.place_id,
      detailedPlace: this.places,
      formattedPhone: "",
      phone: null,
      formattedAddress: "",
      avrgRating: this.places.rating
    };
  },
   watch:{
    detailedPlace(){
      
    }
  },
  mounted() {
console.log("peni")
      let vm = this;

      let request = {
        placeId: this.placeId,
        fields: [
          "name",
          "rating",
          "formatted_phone_number",
          "price_level",
          "opening_hours",
          "rating",
          "review",
          "adr_address",
          "website",
          "url",
          "permanently_closed"
        ]
      };

      let container = document.getElementById("results-one");
      let service = new google.maps.places.PlacesService(container);

      service.getDetails(request, callback);

      function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          vm.detailedPlace = place;
          vm.$forceUpdate();

        }
      }
  },
  computed:{
    returnPhone(){
      return this.detailedPlace.formatted_phone_number;
    }
  },
  
  methods: {
    callModal() {
      this.$refs.modal.open();
    },



    openWebsite(site){
      window.open(site);
    },
    

    callNumber(phone) {
      let newphone = phone
        .replace("(", "")
        .replace(")", "")
        .replace(" ", "")
        .replace("-", "");
      newphone = "tel:+1" + newphone;

      window.open(newphone);
    },
    updatePlace() {



      let vm = this;

      let request = {
        placeId: this.placeId,
        fields: [
          "name",
          "rating",
          "formatted_phone_number",
          "price_level",
          "opening_hours",
          "rating",
          "review",
          "adr_address",
          "website",
          "url",
          "permanently_closed"
        ]
      };

      let container = document.getElementById("results-one");
      let service = new google.maps.places.PlacesService(container);

      service.getDetails(request, callback);

      function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          vm.detailedPlace = place;

        }
      }
    }
  }
};
</script>

<style scoped>
/* MODAL */
@import url("https://fonts.googleapis.com/css?family=Quattrocento+Sans");

.phone-number {
  font-weight: bold;
}
#details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
  grid-gap: 10px;
}
#hours-of-operation-text {
  font-weight: bold;
}
.sweet-modal .sweet-title h2 {
  text-align: center;
  font-size: 20px;
}
.review-single {
  border-radius: 10px;
  padding: 10px;
  margin: 15px;
  box-shadow: 5px 4px 30px white;
}
.place-button{
  height: 30px;
  width:  100px;
  font-size:16px;
  margin-left: auto;
}
.rating {
  text-align: left;
  padding: 5px 10px 5px 10px;
}

.review-text {
  padding: 10px 20px 10px 20px;
  text-align: left;
  font-family: "Quattrocento Sans", sans-serif;
}
.review-name {
  text-align: right;
  font-weight: 900;
  padding-right: 50px;
}
.btn{
  background-color:#ffd166;

  


}

.result-name{
  text-align: left;
  font-weight:bold;
  padding-left: 10px;
  
}
#spot-container{
display:grid;
grid-template-columns: 1.5fr 0fr 1fr 50px 0.5fr;
  align-items: center;
  font-size:18px;
  background-color:white;
  

}

#phone-word {
  font-weight: bold;
}
#address-word {
  font-weight: bold;
}
#link-word{
  font-weight:bold;
}

/*BUTTON */
p {
  max-width: 560px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
  font-size: 18px;
  line-height: 2;
  color: #222;
}

.button {
  background: #E43B4A;
  border-color:none;

  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  font-size: 18px;
  margin: 0 15px;
}

/* Hover state animation applied here */
.button:hover { 
  -webkit-animation: hover 1200ms linear 2 alternate;
  animation: hover 1200ms linear 2 alternate;
}

/* Active state animation applied here */
.button:active {
  -webkit-animation: active 1200ms ease 1 alternate;
  animation: active 1200ms ease 1 alternate; 
  background: #5F9BE0;
}
.gray { background: #D2D2D2; }
.gray:active { background: #b9b9b9; }

/* Active state animation keyframes below */

@-webkit-keyframes active { 
  0% {transform: scale(1,1);}
  90% {transform: scale(.9,.88);}
  100% {transform: scale(.92,.9);}
}

keyframes active { 
  0% {transform: scale(1,1);}
  90% {transform: scale(.9,.88);}
  100% {transform: scale(.92,.9);}
}

/* Hover state animation keyframes below */

@-webkit-keyframes hover { 
  0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  1.8% { -webkit-transform: matrix3d(1.016, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.016, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  3.5% { -webkit-transform: matrix3d(1.033, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.033, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  4.7% { -webkit-transform: matrix3d(1.045, 0, 0, 0, 0, 1.129, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.045, 0, 0, 0, 0, 1.129, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  5.31% { -webkit-transform: matrix3d(1.051, 0, 0, 0, 0, 1.142, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.051, 0, 0, 0, 0, 1.142, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  7.01% { -webkit-transform: matrix3d(1.068, 0, 0, 0, 0, 1.158, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.068, 0, 0, 0, 0, 1.158, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  8.91% { -webkit-transform: matrix3d(1.084, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.084, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  9.41% { -webkit-transform: matrix3d(1.088, 0, 0, 0, 0, 1.132, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.088, 0, 0, 0, 0, 1.132, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  10.71% { -webkit-transform: matrix3d(1.097, 0, 0, 0, 0, 1.107, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.097, 0, 0, 0, 0, 1.107, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  12.61% { -webkit-transform: matrix3d(1.108, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.108, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  14.11% { -webkit-transform: matrix3d(1.114, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.114, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  14.41% { -webkit-transform: matrix3d(1.115, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.115, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  16.32% { -webkit-transform: matrix3d(1.119, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.119, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  18.12% { -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.096, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.121, 0, 0, 0, 0, 1.096, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  18.72% { -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.121, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  20.02% { -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.121, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  21.82% { -webkit-transform: matrix3d(1.119, 0, 0, 0, 0, 1.119, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.119, 0, 0, 0, 0, 1.119, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  24.32% { -webkit-transform: matrix3d(1.115, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.115, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  25.53% { -webkit-transform: matrix3d(1.113, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.113, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  29.23% { -webkit-transform: matrix3d(1.106, 0, 0, 0, 0, 1.089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.106, 0, 0, 0, 0, 1.089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  29.93% { -webkit-transform: matrix3d(1.105, 0, 0, 0, 0, 1.09, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.105, 0, 0, 0, 0, 1.09, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  35.54% { -webkit-transform: matrix3d(1.098, 0, 0, 0, 0, 1.105, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.098, 0, 0, 0, 0, 1.105, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  36.64% { -webkit-transform: matrix3d(1.097, 0, 0, 0, 0, 1.106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.097, 0, 0, 0, 0, 1.106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  41.04% { -webkit-transform: matrix3d(1.096, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.096, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  44.04% { -webkit-transform: matrix3d(1.096, 0, 0, 0, 0, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.096, 0, 0, 0, 0, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  51.45% { -webkit-transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  52.15% { -webkit-transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  58.86% { -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.101, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  63.26% { -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.101, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  66.27% { -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.101, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.101, 0, 0, 0, 0, 1.101, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  73.77% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  81.18% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  85.49% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  88.59% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  96% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  100% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
}

@keyframes hover { 
  0% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  1.8% { -webkit-transform: matrix3d(1.016, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.016, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  3.5% { -webkit-transform: matrix3d(1.033, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.033, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  4.7% { -webkit-transform: matrix3d(1.045, 0, 0, 0, 0, 1.129, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.045, 0, 0, 0, 0, 1.129, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  5.31% { -webkit-transform: matrix3d(1.051, 0, 0, 0, 0, 1.142, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.051, 0, 0, 0, 0, 1.142, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  7.01% { -webkit-transform: matrix3d(1.068, 0, 0, 0, 0, 1.158, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.068, 0, 0, 0, 0, 1.158, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  8.91% { -webkit-transform: matrix3d(1.084, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.084, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  9.41% { -webkit-transform: matrix3d(1.088, 0, 0, 0, 0, 1.132, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.088, 0, 0, 0, 0, 1.132, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  10.71% { -webkit-transform: matrix3d(1.097, 0, 0, 0, 0, 1.107, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.097, 0, 0, 0, 0, 1.107, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  12.61% { -webkit-transform: matrix3d(1.108, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.108, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  14.11% { -webkit-transform: matrix3d(1.114, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.114, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  14.41% { -webkit-transform: matrix3d(1.115, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.115, 0, 0, 0, 0, 1.067, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  16.32% { -webkit-transform: matrix3d(1.119, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.119, 0, 0, 0, 0, 1.077, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  18.12% { -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.096, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.121, 0, 0, 0, 0, 1.096, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  18.72% { -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.121, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  20.02% { -webkit-transform: matrix3d(1.121, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.121, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  21.82% { -webkit-transform: matrix3d(1.119, 0, 0, 0, 0, 1.119, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.119, 0, 0, 0, 0, 1.119, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  24.32% { -webkit-transform: matrix3d(1.115, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.115, 0, 0, 0, 0, 1.11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  25.53% { -webkit-transform: matrix3d(1.113, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.113, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  29.23% { -webkit-transform: matrix3d(1.106, 0, 0, 0, 0, 1.089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.106, 0, 0, 0, 0, 1.089, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  29.93% { -webkit-transform: matrix3d(1.105, 0, 0, 0, 0, 1.09, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.105, 0, 0, 0, 0, 1.09, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  35.54% { -webkit-transform: matrix3d(1.098, 0, 0, 0, 0, 1.105, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.098, 0, 0, 0, 0, 1.105, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  36.64% { -webkit-transform: matrix3d(1.097, 0, 0, 0, 0, 1.106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.097, 0, 0, 0, 0, 1.106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  41.04% { -webkit-transform: matrix3d(1.096, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.096, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  44.04% { -webkit-transform: matrix3d(1.096, 0, 0, 0, 0, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.096, 0, 0, 0, 0, 1.097, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  51.45% { -webkit-transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  52.15% { -webkit-transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.099, 0, 0, 0, 0, 1.102, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  58.86% { -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.101, 0, 0, 0, 0, 1.099, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  63.26% { -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.101, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  66.27% { -webkit-transform: matrix3d(1.101, 0, 0, 0, 0, 1.101, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.101, 0, 0, 0, 0, 1.101, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  73.77% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  81.18% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  85.49% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  88.59% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  96% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  100% { -webkit-transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.1, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); } 
}


/*BUTTON*/








</style>
