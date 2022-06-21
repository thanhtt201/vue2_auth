<template>
  <div>
    List User Page
    <button @click="getUser">Get User</button>
  </div>
</template>

<script>
import authApi from "@/api/auth";

export default {
  methods: {
    async getUser() {
      try {
        const res = await authApi.userList();
        console.log("res", res);
      } catch (error) {
        console.log("errorCall", error.response);
      }
    },
  },
};
</script>
