<template>
<div>
  <div class="text-right">
   <button>建立新產品</button>
   123
  </div>
  <table class="table mt-4">
    <thead></thead>
     <tbody></tbody>
  </table>
</div>
</template>

<script>
export default {
  data () {
    return {
     products:[],
    }
  },
  methods:{
    getProdcuts(){
    const api=`${process.env.AIRPATH}/api/brian92292/admin/products`;
    const vm=this;
    this.$http.post(api).then((response) => {
    console.log(response.data)
  }
  )}
  },
  created(){
      this.getProdcuts();
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
