import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../pages/account/SignIn/LoginUser.vue";
import SignUp from "../pages/account/SignUp/RegisterUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
