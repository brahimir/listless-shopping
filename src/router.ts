import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/home",
      name: "Home",
      component: () => import("./views/pages/Home.vue")
    },
    {
      path: "/about",
      name: "About",
      component: () => import("./views/pages/About.vue")
    }
  ]
});
