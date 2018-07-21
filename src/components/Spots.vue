<template>
    <div id="spot-container" >

        
      
        <div id="results-one"></div>
        <button class = "place-button" @click="callModal(), updatePlace(places)">{{places.name}}</button>


        <div id="modal-container">
            <sweet-modal ref="modal" :title="places.name">
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
  watch:{
    places(){
      // console.log(places)
      // this.detailedPlace = places;
    }
  },
  data: function() {
    return {
      placeId: this.places.place_id,
      detailedPlace: this.places,
      formattedPhone: "",
      phone: null,
      formattedAddress: ""
    };
  },
  mounted() {

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
    updatePlace(places) {



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
  box-shadow: 2px 2px 20px #6d6969;
}
.place-button{
  height: 80%;
  width: 80%;
  font-size:16px;
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

  
  border-radius:5px;

}

#spot-container{

  display: flex;
  justify-content: center;
  align-items: center;

   display:flex;
  justify-content: center;
  align-items: center;
  height:50px;
  width:220px;


  font-size:18px;
  padding:5px;
  border-radius:10px;

  background-color:white;
  box-shadow: 2px 2px 20px black;

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
.spot-title{
  font-size: 16px;
}
.spot-title:hover{
  font-weight:bold;
  transform: scale(1.04);
  color:red;
  transition: 200ms linear all;
}

/*BUTTON*/

button{
  background-color:peachpuff;


}


button:hover{
  transform: scale(1.14);
  border-radius:10px;
  border-color:pink;
  transition-duration: 200ms;
}




</style>
