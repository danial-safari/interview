<template>
  <div class="bg-white">
    <ul class="flex justify-between items-center py-4 mx-3">
      <li>{{ title }}</li>
      <li v-if="enableBack" @click="handleBack()"><img class="w-6 cursor-pointer" src="../assets/images/svg/back.svg" alt="دکمه بازگشت"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header",
  props :{
    enableBack :{
      type : Boolean,
      default : false
    },
    title :{
      type : String,
      required : true
    }
  },
  data(){
    return{}
  },
  methods :{
    handleBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>