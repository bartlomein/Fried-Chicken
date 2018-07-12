<template>
    <div id = "spot-container">
        Name:{{places.name}}<br>
        <button @click="callModal"></button>


    <sweet-modal ref="modal">This is an alert.{{places.rating}}</sweet-modal>
    </div>

</template>

<script>
export default {
    props: ['places'],
    methods:{
        callModal(){
            this.$refs.modal.open();
        }
    }
}
</script>

<style>

</style>
