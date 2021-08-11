<template>
  <div class="h-100">
    <section class="h-100 d-flex auth-block">
      <div class="container">
        <div class="row">
          <div class="col-12 auth-logo-block">
            <img src="@/assets/images/hrm-logo.png" />
          </div>
          <div class="col-12">
            <label>Username</label>
            <input type="text" id="username" v-model="username"/>
          </div>
          <div class="col-12">
            <label>Password</label>
            <input type="password" id="password" v-model="password"/>
          </div>
          <a href="javascript:void(0)" class="link ml-auto mr-3" @click="$router.push('/forgot_password')">Forgot your password?</a>
          <div class="col-12">
            <button class="full-button" @click="login()">LOGIN</button>
          </div>
          <div class="col-12 text-center py-3">
            Don't have an account?
            <router-link to="/register">Register</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { formValidation } from '@/helper/form_validation';
import axios from 'axios';
export default {
  mixins: [formValidation],
  data() {
    return {
      username: '', password: ''
    }
  },
  validators: {
    username(value) { 
      return this.validator.value(value).required(this.required('Username')); 
    },
    password(value) {
      return this.validator.value(value).required(this.required('Password')); 
    },
  }, 
  methods: {
    async login() {
      this.resetFormError();
      this.$validate();
      if(this.validation.errors.length == 0) {
        try {
          this.$store.state.loading = true;
          var data = {
            username: this.username,
            password: this.password
          }
          var response = await axios.post(this.$store.state.apiUrl+'/authenticate/login', data);
          if(response.data.hasOwnProperty('token')) {
            this.$cookies.set("_t_hrm", response.data.token);
            this.$cookies.set("_r_hrm", response.data.role);
            this.$cookies.set("_l_hrm", true);
            window.location.reload();
          }
          else {
            this.$toaster(response.data.message, 'danger');
          }
          this.$store.state.loading = false;
        }
        catch(error) {
          this.$errorHandling(error);
        }
      }
      else {
        this.tooltipError();
      }
    }
  }
}
</script>
<style>
@import "../../assets/css/auth.css";
</style>