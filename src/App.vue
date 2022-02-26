<template>
  <div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name : "App",
  mounted () {
    this.$on('offline', () => {
      this.$toast.error('خطا !! اینترنت خود را بررسی کنید')
    })
  }
}
</script>
<style lang="scss">

</style>
