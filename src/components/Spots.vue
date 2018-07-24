<template>
    <div id="spot-container" >
        
        
        <div class = "result-name">{{places.name}}</div>

        
        <div id="results-one">

        </div>
        <div class = "rating-reg rating">



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
          <div class = "prices-full">
            <div v-if="places.price_level ==1">$</div>
            <div v-else-if="places.price_level ==2">$$</div>
            <div v-else-if="places.price_level ==3">$$$</div>
            <div v-else-if="places.price_level ==4">$$$$</div>
            <div v-else> NA </div>
            
          </div>
          <div class = "button">
        <button class = "" @click="callModal(), updatePlace()">INFO</button>
          </div>

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
#phoneNumber{
  color:#4392F1;
  font-weight:bold;
}
#website{
  color:#4392F1;
  font-weight:bold;
}
#website,#phoneNumber, 
{cursor: pointer;}

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
  background-color:#FFF8F1;
  
}
.prices-full{
  font-weight: bold;
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
.button button{
  width:100px;
  height: 30px;
  color:white;
  font-weight: bold;
  font-size:14px;
  border-radius:5px;
  background-color:#4392F1;
  cursor: pointer;
}
p {


  border-bottom: 1px solid #eee;

  font-size: 14px;

  color: #222;
}



@media only screen and (max-width: 990px){
#map{

}
  
}

@media only screen and (max-width: 500px){
#spot-container{
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;

  margin:10px;
  padding:5px;

  background-color:white;
  border-color:#1F3656;
  
  color:#1F3656;
  border-radius: 10px;
  box-shadow: 5px 5px 10px darkgray;
  


  
}
.result-name{
font-size: 20px;
font-weight: bold;
text-align: center;
}
.button button{
  width:100px;
  height: 30px;
  color:white;
  font-weight: bold;
  font-size:14px;
  border-radius:5px;
  background-color:#4392F1;
}
.rating-reg{
  text-align: center;
}
.prices-full{
  display:inline;
}
  .prices-full{
  display:none;
}
}




/*BUTTON*/








</style>
