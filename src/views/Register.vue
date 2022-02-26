<template>
  <div>
    <Header title="ثبت نام" :enableBack="true"/>
    <h5 class="header-title py-5 mx-3 ">لطفا اطلاعات خود را وارد کنید.</h5>
    <div class="bg-white px-3 py-4">
      <Input label="نـام" type="text" v-model="data.first_name"/>
      <Input label="نام خـانوادگی" type="text" v-model="data.last_name"/>
      <Input label="تلفن همراه" type="tel" v-model="data.phone" :attrs="attrs"/>
      <Input label="تلفن ثابت" type="tel" v-model="data.tellPhone" :attrs="attrs" :isTelephone="true"/>
    </div>
    <div class="bg-white px-3 py-4 mt-4">
      <div class="location" @click="handleSelectLocation">
        <label class="location-title">آدرس دقـیق</label>
        <div class="location-input">
          <span class="location-input__label">{{address}}</span>
          <span class="location-input__icon"><img v-if="isAddressValid" src="../assets/images/svg/check.svg" alt="آیکون تایید"> </span>
        </div>
      </div>
      <div class="gender">
        <span class="gender__title">جنسیت</span>
        <RadioToggleButtons
            v-model='data.gender'
            :values='toggleBtnValues'
            color='purple'
            textColor='#000'
            selectedTextColor='#fff'
            class="gender__toggle"
        />
      </div>
    </div>
    <button class="button absolute mt-16" @click="validationData" :disabled="isLoading">
      <div class="lds-ellipsis" v-if="isLoading"><div></div><div></div><div></div><div></div></div>
      ثبت اطلاعات</button>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from '@/plugins/axios'
import Header from "@/layout/Header";
import Input from "@/components/Input";
import {mapState} from 'vuex'
import RadioToggleButtons from 'vue-radio-toggle-buttons';
import 'vue-radio-toggle-buttons/dist/vue-radio-toggle-buttons.css';
Vue.use(RadioToggleButtons)

export default {
  name: "Register",
  components: {Input, Header},
  data(){
    return{
      attrs:{
        maxlength : "13",
      },
      toggleBtnValues: [
          { label: 'خانوم', value: 'Female' },
          { label: 'آقا', value: 'Male' },
      ],
      location : this.$store.state.map.location,
      address : '',
      isAddressValid : false,
      isLoading : false,
    }
  },
  computed :{
    ...mapState(['data'])
  },
  methods:{
    handleSelectLocation(){
      const data = {
        first_name : this.data.first_name,
        last_name : this.data.last_name,
        phone : this.data.phone,
        tellPhone : this.data.tellPhone,
        gender : this.data.gender
      }
      this.$store.commit('SET_USER_INFORMATION', data)
      this.$router.push({name : 'Map'})
    },
    clearSpaces(str){
      return str.replaceAll(' ', '');
    },
    isObjectEmpty(obj){
      return Object.values(obj).some(x => x === '')
    },
    validationData() {
      const data = {
        ...this.location,
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        coordinate_mobile: this.clearSpaces(this.data.phone),
        coordinate_phone_number: this.clearSpaces(this.data.tellPhone),
        gender: this.data.gender
      }
      switch (false) {
        case data.first_name.length >= 2 :
          this.$toast.error('لطفا نام صحیح انتخاب کنید');
          break;
        case data.last_name.length >= 2:
          this.$toast.error('لطفا نام خانوادگی صحیح وارد کنید');
        break;
        case data.coordinate_mobile.length == 11:
          this.$toast.error('لطفا شماره موبایل صحیح وارد کنید');
          break;
        case data.coordinate_phone_number.length == 11:
          this.$toast.error('لطفا شماره تلفن صحیح وارد کنید');
          break;
        case !this.isObjectEmpty(this.location):
          this.$toast.error('آدرس انتخاب نشده است');
          break;
        case data.gender:
          this.$toast.error('لطفا جنسیت انتخاب کنید');
          break;
        default :
          this.submitForm(data);
          break;
      }
    },
    submitForm(data){
      this.isLoading = true
      axios.post('/address', {
        ...data
      }).then(() => {
        this.isLoading = false
        this.$toast.success('اطلاعات شما با موفقیت ثبت شد و پس از چند ثانیه به صفحه اصلی منتقل می شوید')
        setTimeout(()=>{
          this.$store.dispatch('resetState')
          this.$router.push({name : 'Home'})
        },3000)
      }).catch((err) => {
        this.isLoading = false
        this.$toast.error(err.message)
      })
    }
  },
  mounted() {
    const isLocationEmpty = this.isObjectEmpty(this.location)
    if(!isLocationEmpty){
      this.address = this.location.address
      this.isAddressValid = true
    }
  },
}
</script>

