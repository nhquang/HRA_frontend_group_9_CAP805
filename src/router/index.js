import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: function() {
      return import("../components/auth/login.vue");
    },
  },
  {
    path: "/register",
    name: "Register",
    component: function() {
      return import("../components/auth/register.vue");
    },
  },
  {
    path: "/forgot_password",
    name: "Forgot Password",
    component: function() {
      return import("../components/auth/forgot_password.vue");
    },
  },
  {
    path: "/home",
    name: "Home",
    component: function() {
      return import("../components/home/home.vue");
    },
  },
  {
    path: "/branch",
    name: "Branch",
    component: function() {
      return import("../components/branch/list.vue");
    },
  },
  {
    path: "/branch/add",
    name: "Branch Add",
    component: function() {
      return import("../components/branch/add.vue");
    },
  },
  {
    path: "/branch/edit/:id",
    name: "Branch Edit",
    component: function() {
      return import("../components/branch/edit.vue");
    },
  },
  {
    path: "/department",
    name: "Department",
    component: function() {
      return import("../components/department/list.vue");
    },
  },
  {
    path: "/department/add",
    name: "Department Add",
    component: function() {
      return import("../components/department/add.vue");
    },
  },
  {
    path: "/department/edit/:id",
    name: "Department Edit",
    component: function() {
      return import("../components/department/edit.vue");
    },
  },
  {
    path: "/employee",
    name: "Employee",
    component: function() {
      return import("../components/employee/list.vue");
    },
  },
  {
    path: "/employee/add",
    name: "Employee Add",
    component: function() {
      return import("../components/employee/add.vue");
    },
  },
  {
    path: "/employee/edit/:id",
    name: "Employee Edit",
    component: function() {
      return import("../components/employee/edit.vue");
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
