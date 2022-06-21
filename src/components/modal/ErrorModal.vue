<template>
  <div @click.self="hideModal" class="overlay">
    <div class="frame">
      <div :class="['modal', errorModal.modalActive ? '' : 'hide']">
        <img
          src="https://100dayscss.com/codepen/alert.png"
          width="44"
          height="38"
        />
        <span class="title">Oh snap!</span>
        <p>{{ errorModal.message }}</p>
        <div class="button" @click="hideModal">Oke</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorModal: {
      type: Object,
    },
  },
  methods: {
    hideModal() {
      this.$emit("hide-error-modal", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300);

.overlay {
  position: fixed; /* Sit on top of the page content */
  // display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 96; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer;
}

.frame {
  z-index: 99;
  position: absolute;
  top: 20%;
  left: 50%;
  width: 400px;
  height: 400px;
  margin-top: -200px;
  margin-left: -200px;
  border-radius: 2px;
  //   box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  //   background: #3f3f3f;
  //   color: #415868;
  font-family: "Open Sans", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.modal {
  position: absolute;
  width: 280px;
  height: 210px;
  top: 95px;
  left: 60px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 4px 8px 12px 0 rgba(0, 0, 0, 0.4);
  text-align: center;
  overflow: hidden;
  animation: show-modal 0.7s ease-in-out;

  &.hide {
    animation: hide-modal 0.6s ease-in-out both;
  }

  img {
    margin-top: 24px;
  }

  .title {
    display: block;
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    margin: 14px 0 5px 0;
  }

  p {
    font-size: 14px;
    font-weight: 300;
    line-height: 19px;
    margin: 0;
    padding: 0 30px;
  }

  .button {
    position: absolute;
    height: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f65656;
    color: #fff;
    line-height: 40px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
      background: #ec3434;
    }
  }
}

@keyframes show-modal {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.1);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes hide-modal {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
