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
          <div class="col-12">
            <label>Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword"/>
          </div>
          <div class="col-12">
            <label>Activation Code</label>
            <input type="text" id="activationCode" v-model="activationCode"/>
          </div>
          <div class="col-12">
            <button class="full-button" @click="register()">REGISTER</button>
          </div>
          <div class="col-12 text-center py-3">
            You have an account?
            <a href="/">Login</a>
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
      username: '', password: '', confirmPassword: '', activationCode: ''
    }
  },
  validators: {
    username(value) { 
      return this.validator.value(value).required(this.required('Email')).email().minLength(5, this.minLength('Email', 5)).maxLength(100, this.maxLength('Email', 100)); 
    },
    password(value) {
      return this.validator.value(value).required(this.required('Password')); 
    },
    'confirmPassword, password'(confirm_password, password) { 
      return this.validator.value(confirm_password).required(this.required('Confirm Password')).match(password, this.match('Password'));
    },
    activationCode(value) {
      return this.validator.value(value).required(this.required('Activation Code')); 

    }
  },   
  methods: {
    async register() {
      this.resetFormError();
      this.$validate();
      if(this.validation.errors.length == 0) {
        try {
          this.$store.state.loading = true;
          var data = {
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword,
            activationCode: this.activationCode
          }
          var response = await axios.post(this.$store.state.apiUrl+'/register', data);
          if(response.hasOwnProperty('message')) {
            console.log(response);
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