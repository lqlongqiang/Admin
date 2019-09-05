import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Content from "../views/content/Content";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Content,
      children: [
        {
          path: "",
          component: Home
        }
      ]
    },
    //登录页面路由
    {
      path: "/Login",
      name: "home",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/Login.vue")
        }
      ]
    },
    //注册页面路由
    {
      path: "/Register",
      name: "home",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/Register.vue")
        }
      ]
    }
    /* {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/!* webpackChunkName: "about" *!/ "../views/About.vue")
    }*/
  ]
});
