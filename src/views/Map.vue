<template>
<div class="map">
  <Header class="shadow" title="موقعیت روی نقـشه" :enableBack="false"/>
  <div class="map__notif">
    <h5 class="py-4 ">موقعیت مورد نظر خود را روی نقشه مشخص کنید.</h5>
  </div>
  <mapir
      :apiKey="mapirToken"
      :center="center"
      :zoom="11"
      @click="selectLocation"
  >
    <mapMarker
        :coordinates="markerCoordinates"
        :draggable="true"
    ><template slot="marker">
      <img class="w-12 h-12 rounded-full" src="../assets/images/svg/marker.svg" alt="">
    </template>
    </mapMarker>
  </mapir>
  <button class="button fixed bottom-4" @click="acceptLocation">تاییـد موقعیت</button>
</div>
</template>

<script>
import {mapir, mapMarker} from "mapir-vue";
import Header from "@/layout/Header";

export default {
  name: "Map",
  components: {
    mapir,
    mapMarker,
    Header
  },
  data(){
    return{
      center: [51.420296, 35.732379],
      markerCoordinates : [51.420296, 35.732379],
      mapirToken : this.$store.state.map.token
    }
  },
  methods:{
    selectLocation({actualEvent}) {
      let lngLat = actualEvent.lngLat;
      this.markerCoordinates = [lngLat.lng , lngLat.lat ]
    },
    async acceptLocation(){
      await this.$store.dispatch('getDetailLocation' , this.markerCoordinates)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>