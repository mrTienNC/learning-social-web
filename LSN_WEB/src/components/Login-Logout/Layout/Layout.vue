<template>
  <div class="layout" v-show="layoutCheck">
    <div class="first-child">
      <b-button size="lg" id="routerLink">
        <router-link :to="{name: 'ListCourse'}" >
          <span @click="layoutCheckToParent">List Course</span>
        </router-link>
      </b-button>
    </div>
    <div class="last-child">
      <b-carousel id="carousel1"
                  controls
                  indicators
                  :interval="4000"
                  v-model="slide"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
      >
        <b-carousel-slide>
          <img slot="img" class="img-fluid w-100" src="../../../assets/pageHome/image1.png" alt="image slot">
        </b-carousel-slide>
        <b-carousel-slide >
          <img slot="img" class="img-fluid w-100" src="../../../assets/pageHome/image2.png" alt="image slot">
        </b-carousel-slide>
        <b-carousel-slide >
          <img slot="img" class="img-fluid w-100" src="../../../assets/pageHome/image3.png" alt="image slot">
        </b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>
<script>
export default {
  props: ['layoutCheck'],
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    layoutCheckToParent() {
      this.layoutCheck = false;
      this.$emit('TurnOff', this.layoutCheck);
    },
  },
};
</script>
<style scoped>
  @import "./styleLayout.css";
</style>
