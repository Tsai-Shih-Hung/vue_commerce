<template>
  <div class="hello">
   123
   <a href="#" @click="logout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    logout(){
      const api=`${process.env.AIRPATH}/logout`;
      const vm=this;
        this.$http.post(api).then((response) => {
        console.log(response.data)
        if(response.data.success){
          vm.$router.push('/login');
          console.log('以登出');
        }
      
  }
  )}
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
