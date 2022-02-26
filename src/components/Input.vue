<template>
  <div class="input" @click.prevent="handleClickDiv">
    <label class="input__label">{{ label }}</label>
    <input class="input__text" ref="input" v-bind="attrs" v-model="model" :type="type" @keypress="isNumber($event)"/>
    <span class="input__icon">
      <img v-if="isValid" src="../assets/images/svg/check.svg" alt="آیکون تایید">
    </span>
  </div>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {
      isValid: false,

    }
  },
  props: {
    label: {
      type: String,
      required: true,
      default: 'عنوان شما'
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    attrs: {
      type: Object,
    },
    isTelephone :{
      type : Boolean,
      default: false
    }
  },
  methods: {
    handleClickDiv() {
      this.$refs.input.focus()
    },
    isNumber(event) {
      if(this.type === 'tel'){
        event = (event) ? event : window.event;
        let charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          event.preventDefault();
        } else {
          return true;
        }
      }
    },
    checkLength(value, operator, length) {
      switch (operator) {
        case '===':
          value.length === length ? this.isValid = true : this.isValid = false;
          break;
        case '>=' :
          value.length >= length ? this.isValid = true : this.isValid = false;
          break;
        case '<=':
          value.length <= length ? this.isValid = true : this.isValid = false;
          break;
      }
    },
  },
  computed: {
    model : {
      get(){
        if (this.type === 'tel' && this.value.length === 13 && Number(this.value) === true){
          this.isValid = true
        }else if(this.type === 'text' && this.value.length >= 2){
          this.isValid = true
        }
        return this.value
      },
      set(value){
        if (this.type === 'tel') {
            if(this.isTelephone){
              if (value.length === 3 || value.length === 9) {
                value = value + ' '
              }
            }else{
              if (value.length === 4 || value.length === 8) {
                value = value + ' '
              }
            }
            this.checkLength(value, '===', 13)

        } else {
          this.checkLength(value, '>=', 2)
        }
        this.$emit('input', value);
      }
    }
  },

}
</script>

<style scoped>

</style>