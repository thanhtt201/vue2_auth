<template>
  <div>
    <Header />
    <button>
      <router-link to="/signup"> Register</router-link>
    </button>
    <button>
      <router-link to="/signin">Login</router-link>
    </button>
    <router-view />
  </div>
</template>

<script>
import Header from "../components/header/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>
