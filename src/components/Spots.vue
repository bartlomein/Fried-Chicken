<template>
    <div id = "spot-container">
        Name:{{places.name}}<br>
        <div id="results-one"></div>
        <button @click="callModal(), updatePlace(places)" ></button>
        

    <div id = "modal-container">
    <sweet-modal  ref="modal" :title="places.name">
        
        {{places.rating}}
        <div id = "details" v-if="detailedPlace" >
            <div id = "phoneNumber" @click ="callNumber(detailedPlace.formatted_phone_number)">
            {{detailedPlace.formatted_phone_number}}
            </div>
        </div>
        
        </sweet-modal>
    </div>
</div>
</template>

<script>
export default {
  props: ["places"],
  data() {
    return {
      placeId: '',
      detailedPlace: null,
      formattedPhone:'',
      phone:null
    };
  },
  mounted(){
    

  },
  methods: {
    callModal() {
      this.$refs.modal.open();
    },
    callNumber(phone){
        console.log(phone);
        let newphone = phone.replace('(','').replace(')','').replace(' ','').replace('-','');
        newphone = 'tel:+1' + newphone;
        
        
        console.log(newphone);
        window.open(newphone);
    },
    updatePlace(places) {
      this.placeId = places.place_id;
      console.log(this.placeId);
      let vm = this;
      
      let request = {
        placeId: this.placeId,
        fields: ["name", "rating", "formatted_phone_number", "price_level", "rating", "review"]
      };
      let container = document.getElementById("results-one");
      let service = new google.maps.places.PlacesService(container);


      service.getDetails(request, callback);

      function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            

          vm.detailedPlace = place;
          console.log(vm.detailedPlace)


        }
      }
    }
  },
};
</script>

<style>
</style>
