import app from "../../../main";

export default {
  state: () => ({
    thành: "đz",
  }),
  mutations: {
    SET_LANG(state, payload) {
      console.log("ee", payload);
      app.$i18n.locale = payload;
    },
  },
  actions: {
    setLang({ commit }, payload) {
      commit("SET_LANG", payload);
    },
  },
};
