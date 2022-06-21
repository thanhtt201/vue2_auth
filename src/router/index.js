import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../pages/account/SignIn/LoginUser.vue";
import SignUp from "../pages/account/SignUp/RegisterUser.vue";
import ListUser from "../pages/account/listUser/ListUserPage.vue";

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
  {
    path: "/listuser",
    name: "listuser",
    component: ListUser,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
