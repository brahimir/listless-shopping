import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("./views/pages/home/Home.vue")
    },
    {
      path: "/about",
      name: "About",
      component: () => import("./views/pages/About.vue")
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("./views/pages/Settings.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/pages/auth/Login.vue")
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("./views/pages/auth/Register.vue")
    }
  ]
});
