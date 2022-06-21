<template>
  <div @click.self="hideSuccessModal" class="modal-frame">
    <div class="modal-active modal-block">
      <h2>{{ successModal.title }}</h2>
      <p>{{ successModal.message }}</p>
      <button class="modal-btn-success" @click="hideSuccessModal">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    successModal: {
      type: Object,
    },
  },
  methods: {
    hideSuccessModal() {
      this.$emit("hide-success-modal", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-frame {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal-block {
  position: absolute;
  padding-top: 20px;
  left: 50%;
  right: 50%;
  width: 350px;
  height: 180px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  overflow: hidden;
  z-index: 99;
}

.modal-btn-success {
  border: none;
  border-radius: 2px;
  background-color: #8cd4f5;
  padding: 10px 20px;
  color: #ffffff;
  cursor: pointer;
}
</style>
