<template>
  <div class="login-page">
    <div class="form">
      <form class="register-form" @submit="handleRegister">
        <div>
          <input
            type="text"
            placeholder="Tên"
            v-model.trim.trim="formRegister.firstName"
            @blur="$v.formRegister.firstName.$touch()"
          />
          <span class="error-message">{{ errorFirstName }}</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Họ"
            v-model.trim="formRegister.lastName"
            @blur="$v.formRegister.lastName.$touch()"
          />
          <span class="error-message">{{ errorLastName }}</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Số điện thoại"
            v-model.trim="formRegister.phone"
            @blur="$v.formRegister.phone.$touch()"
          />
          <span class="error-message">{{ errorPhone }}</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Địa chỉ email"
            v-model.trim="formRegister.email"
            @blur="$v.formRegister.email.$touch()"
          />
          <span class="error-message">{{ errorEmail }}</span>
        </div>
        <div>
          <input
            type="password"
            placeholder="Mật khẩu"
            v-model.trim="formRegister.password"
            @blur="$v.formRegister.password.$touch()"
          />
          <span class="error-message">{{ errorPassword }}</span>
        </div>
        <button>create</button>
        <p class="message">
          Already registered? <router-link to="/signin">Sign In</router-link>
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
import userApi from "../../../api/auth.js";
import ErrorModal from "@/components/modal/ErrorModal.vue";
import SuccessModal from "@/components/modal/SuccessModal.vue";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      formRegister: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
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
  validations() {
    return {
      formRegister: {
        firstName: { required },
        lastName: { required },
        email: {
          required,
          email,
          minLength: minLength(8),
          maxLength: maxLength(127),
        },
        password: { required },
        phone: { required },
      },
    };
  },
  computed: {
    errorFirstName() {
      let error;
      if (!this.$v.formRegister.firstName.$dirty) return null;
      if (!this.$v.formRegister.firstName.required) {
        error = "FirstName không được để trống!";
      }
      return error;
    },
    errorLastName() {
      let error;
      if (!this.$v.formRegister.lastName.$dirty) return null;
      if (!this.$v.formRegister.lastName.required) {
        error = "LastName không được để trống!";
      }
      return error;
    },
    errorPhone() {
      let error;
      if (!this.$v.formRegister.phone.$dirty) return null;
      if (!this.$v.formRegister.phone.required) {
        error = "Phone không được để trống!";
      }
      return error;
    },
    errorEmail() {
      let error;
      if (!this.$v.formRegister.email.$dirty) return null;
      if (!this.$v.formRegister.email.required) {
        error = "Email không được để trống!";
      }
      if (!this.$v.formRegister.email.email) {
        error = "Email không đúng định dạng!";
      }
      return error;
    },
    errorPassword() {
      let error;
      if (!this.$v.formRegister.password.$dirty) return null;
      if (!this.$v.formRegister.password.required) {
        error = "Password không được để trống!";
      }
      return error;
    },
  },
  methods: {
    async handleRegister(event) {
      event.preventDefault();
      const userInfo = {
        lastname: this.formRegister.lastName,
        firstname: this.formRegister.firstName,
        email: this.formRegister.email,
        password: this.formRegister.password,
        phone: this.formRegister.phone,
      };
      try {
        const res = await userApi.signUp(userInfo);
        if (res.data) {
          this.successModal.active = true;
        }
      } catch (error) {
        if (error.response.data.message.length > 1) {
          this.errorModal.message = error.response.data.message[0];
        } else {
          this.errorModal.message = error.response.data.message;
        }
        this.errorModal.modalActive = true;
      }
    },
    hideErrorModal($v) {
      this.errorModal.modalActive = $v;
    },
    hideSuccessModal($v) {
      this.successModal.active = $v;
      this.$router.push("/signin");
    },
  },
  // mounted() {
  //   console.log("$v", this.$v);
  // },
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
  margin: 15px 0 5px 0;
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
  margin-top: 15px;
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
  display: block;
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
.error-message {
  color: red;
  font-size: 0.9rem;
}
</style>
