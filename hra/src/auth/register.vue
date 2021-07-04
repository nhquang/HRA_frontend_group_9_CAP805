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
          <div class="col-12">
            <label>Confirm Password</label>
            <input type="password" />
          </div>
          <div class="col-12">
            <label>Activation Code</label>
            <input type="text" />
          </div>
          <div class="col-12">
            <button class="full-button">REGISTER</button>
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
<style>
@import "../../assets/css/auth.css";
</style>