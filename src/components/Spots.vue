<template>
    <div id = "spot-container">
        Name:{{places.name}}<br>
        Rating {{places.rating}}

    </div>

</template>

<script>
export default {
    props: ['places'],
}
</script>

<style>

</style>
