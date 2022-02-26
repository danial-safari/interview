<template>
    <button class="navigation__button" @click="()=>this.$router.push({name : 'Register'})">
        <span class="icon-svg">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="inline"
             width="16.149" height="16.149"
             viewBox="0 0 16.149 16.149"><path
            id="Page_1" data-name="Page 1"
            d="M8.074,0A1.275,1.275,0,0,0,6.8,1.275V6.8H1.275a1.275,1.275,0,1,0,0,2.55H6.8v5.525a1.275,1.275,0,1,0,2.55,0V9.349h5.525a1.275,1.275,0,1,0,0-2.55H9.349V1.275A1.275,1.275,0,0,0,8.074,0Z"
            fill="#fff"></path></svg></span>
    </button>
</template>

<script>
export default {
  name: "NavigationButton",
}
</script>

<style scoped>

</style>