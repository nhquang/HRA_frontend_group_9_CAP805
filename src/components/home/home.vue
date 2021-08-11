<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Dashboard</p>
        </div>
      </div>
    </div>
    <div class="sm-page-body b-0">
      <div class="row m-0">
        <div class="col-12 col-md-4 p-3">
          <div class="sm-home-title-block">
            Welcome, {{name}}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data(){
    return {
      name :""
    }
  },
  async created(){
    try {
      this.$store.state.loading = true;
      var response = await axios.get(this.$store.state.apiUrl+'/account', {
        headers: {
          Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
        }
      });
      if(response.hasOwnProperty('data')) {   
        this.name = response.data.username;
      }
      this.$store.state.loading = false;
    } catch (error) {
      this.$errorHandling(error);
    }
  }
}
</script>
