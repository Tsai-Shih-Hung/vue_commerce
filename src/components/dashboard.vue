<template>
  <div>
      
      <Navbar/>
    <div class="container-fluid">
  <div class="row">
      <Sidebar></Sidebar>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
    </main>
    </div>
  </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import Navbar from'./Navbar';
import Alert from './pages/alertmessage';

export default {
    components:{
        Sidebar,
        Navbar
  },
  data () {
    return {
    }
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
