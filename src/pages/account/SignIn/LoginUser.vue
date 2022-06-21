<template>
  <div class="login-page">
    <div class="form">
      <form class="login-form" @submit.prevent="handleLoginUser">
        <input type="text" placeholder="email" v-model="formLogin.email" />
        <input
          type="password"
          placeholder="password"
          v-model="formLogin.password"
        />
        <button>{{ $t("login.buttons.login") }}</button>
        <p class="message">
          {{ $t("login.messages.none_account") }}
          <router-link to="/signup">{{
            $t("login.messages.register")
          }}</router-link>
        </p>
      </form>
    </div>
    <ErrorModal
      v-if="errorModal.modalActive"
      @hide-error-modal="hideErrorModal"
      :error-modal="errorModal"
    />
    <SuccessModal
      v-if="successModal.active"
      @hide-success-modal="hideSuccessModal"
      :success-modal="successModal"
    />
  </div>
</template>

<script>
import authApi from "@/api/auth";
import ErrorModal from "@/components/modal/ErrorModal.vue";
import SuccessModal from "@/components/modal/SuccessModal.vue";

export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: "",
      },
      errorModal: {
        modalActive: false,
        message: "Lỗi server. Vui lòng kiểm tra lại!",
      },
      successModal: {
        active: false,
        title: "Thành công",
        message: "Thành công",
      },
    };
  },
  components: {
    ErrorModal,
    SuccessModal,
  },
  methods: {
    async handleLoginUser() {
      try {
        const res = await authApi.signIn(this.formLogin);
        if (res.data.accessToken) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(res.data.accessToken)
          );
        }
        if (res.data) {
          this.successModal.active = true;
        }
      } catch (error) {
        // console.log("error", error.response.data.message);
        // if (typeof error.response.data.message === Array) {
        //   this.errorModal.message = error.response.data.message[0];
        // } else {
        this.errorModal.message = error.response.data.message;
        // }
        this.errorModal.modalActive = true;
      }
    },
    hideErrorModal($v) {
      this.errorModal.modalActive = $v;
    },
    hideSuccessModal($v) {
      this.successModal.active = $v;
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4caf50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #ef3b3a;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141, 194, 111);
  background: linear-gradient(
    90deg,
    rgba(141, 194, 111, 1) 0%,
    rgba(118, 184, 82, 1) 50%
  );
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
