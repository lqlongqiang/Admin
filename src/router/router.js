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
      component: Content,
      children: [
        {
          path: "/",
          redirect: "/Homepage"
        },
        {
          path: "",
          component: Home
        }
      ]
    },
    //登录页面路由
    {
      path: "/Login",
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
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/Register.vue")
        }
      ]
    },
    //首页
    {
      path: "/Homepage",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/Homepage.vue")
        }
      ]
    },
    {
      path: "/Tasks",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/Tasks.vue")
        }
      ]
    },
    //配置通讯录路由
    {
      path: "/MailList",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/MailList.vue")
        }
      ]
    },
    //配置组织员工及下面的子路由
    {
      path: "/OrganizeStaff",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/OrganizeStaff.vue")
        },
        {
          path: "Offer",
          component: () => import("../views/Offer.vue")
        },
        {
          path: "Personnel",
          component: () => import("../views/Personnel.vue")
        },
        {
          path: "Payment",
          component: () => import("../views/Payment.vue")
        }
      ]
    },
    //配置表单页及子路由
    {
      path: "/FormPage",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("../views/FormPage.vue")
        },
        {
          path: "CheckForm",
          component: () => import("../views/CheckForm.vue")
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
