<template>
  <div class="scroll-style">
    <Header title="لیست آدرس ها" class="shadow-md" />
    <div class="my-6 mx-3 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 ">
      <template v-if="isLoading">
        <PreLoader
            v-for="i in 16"
            :key="`A-${i}`"
        />
      </template>
      <div class="box"
           v-for="(item ,i) in data"
           :key="`B-${i}`"
           v-else
      >
        <div class="box__top">
          <span class="box__item">
            <img src="../assets/images/svg/user.svg" alt="">
            <h3>{{item.first_name + ' ' + item.last_name}}</h3>
          </span>
          <span class="box__item">
            <img src="../assets/images/svg/phone.svg" alt="">
            <h3>{{item.coordinate_mobile}}</h3>
          </span>
        </div>
        <div class="box__bottom">
          <span class="box__item">
            <img src="../assets/images/svg/location.svg" alt="">
            <h3>{{item.address}}</h3>
          </span>
        </div>
      </div>
      <NavigationButton/>
    </div>
  </div>
</template>

<script>
import Header from "@/layout/Header";
import axios from "@/plugins/axios";
import PreLoader from "@/components/PreLoader";
import NavigationButton from "@/components/NavigationButton";
export default {
  name: 'Home',
  components: {
    Header,
    PreLoader,
    NavigationButton
  },
  data(){
    return{
      data : null,
      isLoading : false
    }
  },
  methods:{
    fetchData(){
      this.isLoading = true
      axios.get('/address').then(({data}) => {
        this.isLoading = false
        //dsc data
        data.sort((a,b) => b.id - a.id)
        this.data = data
      }).catch((err) => {
        this.isLoading = false
        this.$toast.error(err.message)
      })
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
