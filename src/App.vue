<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <div class="alert alert-primary" role="alert">
     A simple primary alert—check it out!
  </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  // created(){
  //   const api=`${process.env.AIRPATH}/api/${process.env.CUSTOMPATH}/products`;
  //   this.$http.get(api).then((response) => {
  //   console.log(response.data)
  //   })

  
}
</script>

<style lang="scss">
 @import "~bootstrap/scss/bootstrap";
</style>
