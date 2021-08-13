<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Dashboard</p>
        </div>
      </div>
    </div>
    <div class="sm-page-body">     
      <div class="col-lg-6 col-xl-4 col-md-6 col-sm-12 p-0">
        <div class="row sm-page-block">
           <div class="col-12 mb-2 px-2">
            <label class="req">Username</label>
            <input type="text" id="name" v-model="name"/>
          </div>   
          <div class="col-12 mb-2 px-2">
            <label class="req">Password</label>
            <input type="text" id="password" v-model="password"/>         
          </div>
          <div class="col-12 mb-2 px-2">
            <label class="req">Confirm Password</label>
            <input type="text" id="confirmPassword" v-model="confirmPassword"/>         
          </div>        
        </div>

      </div>
    </div>
    <div class="sm-page-footer">
      <div class="row">
        <div class="col-12  my-auto">                  
          <button class="btn save-btn" @click="edit()">
            <i class="fa fa-check"></i>
            <span>Update</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { formValidation } from '@/helper/form_validation';
export default {
  mixins: [formValidation],
  data(){
    return {
      name :"", password:"", confirmPassword:""
    }
  },
  validators: {
    name(value) { return this.validator.value(value).required(this.required('Name')); },
    password(value) { return this.validator.value(value).required(this.required('password')); },
    confirmPassword(value) { return this.validator.value(value).required(this.required('confirmPassword')); },    
  },
  methods: {
    back() {
      this.$router.push('/branch');
    },
    async test() {
      console.log(this.name);
      console.log(this.password);
      console.log(this.confirmPassword);
    },
  
  async edit(){

    this.resetFormError();
      var confirm = await this.$confirm('Are you sure to update?');
      if(confirm) { 
        this.$validate();
        if(this.validation.errors.length == 0) {
          try {
            this.$store.state.loading = true;
            var data = {
              username :this.name, password:this.password, confirmPassword:this.confirmPassword
            }
            var response = await axios.post(this.$store.state.apiUrl+'/account/update_account', data, {
              headers: {
                Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
              }
            });
            console.log(response);
            if(response.hasOwnProperty('data')) {
              this.$store.state.loading = false;
              this.$toaster(response.data.message);
            }else{
              this.$toaster(response.data.message, 'danger')

            }
          }
          catch(error) {
            this.$errorHandling(error);
          }
        }
        else {
          this.tooltipError();
        }
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
}
</script>
