<template>
  <div class="next-prev">
    <div class="wrapper">
      <button
        class="prev btn"
        type="button"
        @click="prev"
        :class="{
          active: thisStep.number != 1,
        }"
      >
        Geri
      </button>
      <button type="submit" class="next btn">
        <span class="text" v-if="thisStep.number != 3">
          Kaydet ve Devam Et
        </span>
        <span class="text" v-if="thisStep.number == 3">
          Ödeme Yap ve Bitir
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NextPrev",

  computed: {
    ...mapGetters(["steps", "thisStep"]),
  },

  methods: {
    prev(){
      let thisStepNumber = JSON.parse(localStorage.getItem("thisStep")).number;
      this.$store.commit('setStep', thisStepNumber - 2)
    }
  }
};
</script>

<style scoped lang="scss">
.next-prev {
  margin-top: 1em;
  background-color: $grey;
  padding: 25px;
  @include border-radius(6px);

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .prev {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      &.active {
        visibility: visible;
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
}
</style>
