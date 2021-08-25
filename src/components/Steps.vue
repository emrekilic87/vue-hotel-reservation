<template>
  <div class="steps">
    <div
      class="steps__step"
      v-for="step in steps"
      :key="step.number"
      :class="{
        active: step.number === thisStep.number,
        finished: step.number < thisStep.number,
      }"
    >
      <div class="steps__step-number">{{ step.number }}</div>
      <div class="steps__step-title">{{ step.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Steps",
  computed: {
    ...mapGetters(["steps", "thisStep"]),
  },
};
</script>

<style scoped lang="scss">
.steps {
  background-color: $grey;
  @include border-radius(6px);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;

  &__step {
    text-align: center;
    position: relative;
    width: 300px;
    &::after {
      content: "";
      height: 1px;
      width: 100%;
      position: absolute;
      background-color: #dfd7d7;
      top: 20px;
      right: -50%;
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
    &-number {
      border-radius: 50%;
      border: 1px solid;
      width: 40px;
      margin: 0 auto;
      height: 40px;
      align-items: center;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      background-color: #fff;
      position: relative;
      z-index: 1;
    }
    &-title {
      max-width: 100px;
      margin: 0 auto;
      font-size: 12px;

      @media only screen and (max-width: 768px) {
        font-size: 8px;
      }
    }

    &.active {
      .steps__step-title {
        font-weight: bold;
      }
    }
  }
}
</style>
