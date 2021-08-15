<template>
  <div id="app">
    <template v-if="isLogin">
      <section class="h-100 sm-nav">
        <div class="nav-menu-block">
          <a href="javascript:void(0)" @click="toggleMenu()">
            <i class="fa fa-bars fa-lg"></i>
          </a>
        </div>
        <div class="menu-logo-block">
          <a href="javascript:void(0)" @click="clickMenu('')">
            <img src="@/assets/images/hrm-logo.png" alt="hrm logo" />
          </a>
        </div>
        <a
          href="javascript:void(0)"
          class="sm-nav-item"
          :class="selected_menu == 'branch' ? 'selected' : ''"
          @click="clickMenu('branch')"
          
        >
          <i class="fa fa-briefcase"></i><span>Branch</span>
        </a>
        <a
          href="javascript:void(0)"
          class="sm-nav-item"
          :class="selected_menu == 'department' ? 'selected' : ''"
          @click="clickMenu('department')"
          
        >
          <i class="fa fa-building"></i><span>Department</span>
        </a>
        <a
          href="javascript:void(0)"
          class="sm-nav-item"
          :class="selected_menu == 'employee' ? 'selected' : ''"
          @click="clickMenu('employee')"
          
        >
          <i class="fa fa-user"></i><span>Employee</span>
        </a>
        <div class="nav-bottom">
          <a href="javascript:void(0)" class="sm-nav-item" @click="logout()">
            <i class="fa fa-sign-out"></i><span>Logout</span>
          </a>
        </div>
      </section>
      <section class="h-100 sm-body">
        <router-view />
      </section>
    </template>
    <router-view v-else />
    <div class="loading" v-if="$store.state.loading"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      selected_menu: "",
      role: "",
    };
  },
  methods: {
    toggleMenu() {
      if (document.querySelector(".sm-nav").style.left == 0) {
        document.querySelector(".sm-nav").style.left = "-15rem";
        document.querySelector(".sm-body").style.left = "0rem";
      } else {
        document.querySelector(".sm-nav").removeAttribute("style");
        document.querySelector(".sm-body").removeAttribute("style");
      }
    },
    clickMenu(key) {
      if (this.selected_menu != key) {
        this.selected_menu = key;
        this.$router.push("/" + key);
      }
    },
    logout() {
      this.$cookies.remove("_l_hrm");
      this.$cookies.remove("_t_hrm");
      this.$cookies.remove("_r_hrm");
      window.location.reload();
    },
  },
  created() {
    this.isLogin =
      this.$cookies.isKey("_l_hrm") &&
      this.$cookies.get("_l_hrm") &&
      this.$cookies.isKey("_r_hrm") &&
      this.$cookies.isKey("_t_hrm")
        ? true
        : false;
    if (this.isLogin) {
      this.role = this.$cookies.get("_r_hrm");
      this.$router.push("/");
    } else {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.$root.$on("bv::modal::shown", () => {
      var el = document.querySelectorAll(".btn-alert").length - 1;
      var focusElement = document.querySelectorAll(".btn-alert")[el];
      setTimeout(() => {
        focusElement.focus();
      }, 0);
    });
  },
};
</script>
<style>
@import "./assets/css/basic.css";
@import "./assets/vendor/font-awesome/css/font-awesome.min.css";
</style>