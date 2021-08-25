<template>
  <div id="app">
    <Header />
    <div class="container">
      <Steps />
      <DateSelection v-if="thisStep.number == 1" />
      <RoomTypes v-if="thisStep.number == 2" />
      <Pay v-if="thisStep.number == 3" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./components/Header.vue";
import Steps from "./components/Steps.vue";
import DateSelection from "./components/DateSelection.vue";
import RoomTypes from "./components/RoomTypes.vue";
import Pay from "./components/Pay.vue";

export default {
  name: "App",
  components: {
    Header,
    Steps,
    DateSelection,
    RoomTypes,
    Pay,
  },
  computed: {
    ...mapGetters(["thisStep"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
