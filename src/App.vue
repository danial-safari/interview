<template>
  <div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name : "App",
  data(){
    return{
      onLine: navigator.onLine,
      showBackOnline: false
    }
  },
  methods:{
    updateOnlineStatus(e) {
      this.onLine = e.type === 'online';
    }
  },
  watch :{
    onLine(v) {
      if (v) {
        this.showBackOnline = true;
        setTimeout(() => {
          this.$toast.error('اینترنت خود را بررسی کنید')
          this.showBackOnline = false;
        }, 1000);
      }
    }
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }
}
</script>
<style lang="scss">

</style>
