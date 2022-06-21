<template>
  <div>
    <Header />
    <button>
      <router-link to="/signup"> Register</router-link>
    </button>
    <button>
      <router-link to="/signin">Login</router-link>
    </button>
    <button>
      <router-link to="/listuser">List User</router-link>
    </button>
    <div style="margin-top: 10px">
      <select name="cars" id="cars" @change="callSetLangActions">
        <option
          v-for="lang in optionLangs"
          :key="lang.value"
          @click.prevent="callSetLangActions"
        >
          {{ lang.value }}
        </option>
      </select>
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from "../components/header/Header.vue";

export default {
  data() {
    return {
      optionLangs: [
        {
          text: "Vietnamese",
          value: "vn",
        },
        {
          text: "English",
          value: "en",
        },
      ],
    };
  },
  components: {
    Header,
  },
  methods: {
    callSetLangActions(event) {
      console.log("event", event.target.value);
      this.$store.dispatch("setLang", event.target.value);
    },
  },
};
</script>
