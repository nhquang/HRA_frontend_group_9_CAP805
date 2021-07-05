<template>
  <div class="h-100">
    <section class="h-100 d-flex auth-block">
      <div class="container">
        <div class="row">
          <div class="col-12 auth-logo-block">
            <img src="@/assets/images/hrm-logo.png" />
          </div>
          <div class="col-12">
            <label>Email address</label>
            <input type="email" />
          </div>
          <div class="col-12">
            <label>Password</label>
            <input type="password" />
          </div>
          <a href="" class="link">Forgot your password?</a>
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
export default {
  methods: {
    login() {
      this.$cookies.set("login", true);
      window.location.reload();
    }
  }
}
</script>
<style>
@import "../../assets/css/auth.css";
</style>