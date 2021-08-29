<template>
  <form class="date-selection" @submit.prevent="onSubmit">
    <select
      class="date-selection__select"
      v-model="hotel"
      @change="onChange($event)"
      :required="true"
    >
      <option disabled value="">Hotel Seçiniz</option>
      <option
        v-bind:key="hotel.id"
        v-bind:value="hotel.id"
        v-for="hotel in hotelList"
      >
        {{ hotel.hotel_name }}
      </option>
    </select>

    <div class="date-selection__area">
      <div class="date-selection__box">
        <h3 class="date-selection__title">Giriş Tarihi</h3>
        <Datepicker v-model="startDate" :min-date="new Date()">
          <template v-slot="{ inputValue, togglePopover }">
            <div class="datepicker startDate">
              <input :value="inputValue" class="input" readonly />
              <button type="button" class="date-icon" @click="togglePopover()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  class="w-4 h-4 fill-current"
                >
                  <path
                    d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </template>
        </Datepicker>
      </div>
      <div class="date-selection__box">
        <h3 class="date-selection__title">Çıkış Tarihi</h3>
        <Datepicker
          v-model="endDate"
          :available-dates="{ start: this.startDate, end: null }"
        >
          <template v-slot="{ inputValue, togglePopover }">
            <div class="datepicker endDate">
              <input :value="inputValue" class="input" readonly />
              <button type="button" class="date-icon" @click="togglePopover()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  class="w-4 h-4 fill-current"
                >
                  <path
                    d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </template>
        </Datepicker>
        <div class="error" v-if="this.diffDay <= 0">
          Çıkış tarihi giriş tarihiyle aynı ve erken olamaz.
        </div>
      </div>
      <div class="date-selection__box">
        <h3 class="date-selection__title">Yetişkin Sayısı</h3>
        <input
          type="number"
          name="adultNumber"
          class="adultNumber input"
          min="0"
          max="5"
          v-model="adultNumber"
        />
        <div class="error" v-if="!this.adultNumber">
          Lütfen yetişkin sayısı giriniz.
        </div>
        <div class="error" v-if="this.adultNumber > 5">
          Yetişkin sayısı en fazla 5 olabilir.
        </div>
      </div>
      <div class="date-selection__box">
        <h3 class="date-selection__title">Çocuk Sayısı</h3>
        <input
          type="number"
          name="childNumber"
          class="childNumber input"
          min="0"
          max="5"
          v-model="childNumber"
          :class="{
            warning: this.childNumber > 5,
          }"
          :disabled="this.childStatus == false"
        />
        <div class="error" v-if="!this.childNumber">
          Lütfen çocuk sayısı giriniz.
        </div>
        <div class="error" v-if="this.childNumber > 5">
          Çocuk sayısı en fazla 5 olabilir.
        </div>
        <div class="error" v-if="this.childStatus == false">
          Çocuk ziyaretçi kabul edilmiyor!
        </div>
      </div>
    </div>

    <NextPrev />
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Datepicker from "v-calendar/lib/components/date-picker.umd";
import NextPrev from "./NextPrev.vue";

export default {
  name: "DateSelection",

  data() {
    return {
      hotel: "",
      hotelName: "",
      disabled: "",
      visible: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      adultNumber: "2",
      childNumber: "0",
      diffDay: "1",
      disabled: '',
    };
  },

  components: {
    Datepicker,
    NextPrev,
  },

  methods: {
    ...mapActions(["fetchHotels", "fetcChildStatus"]),

    onChange(event) {
      this.hotelName = event.target[this.hotel].text;
      let hotelId = this.hotel;
      this.fetcChildStatus(hotelId)
    },

    onSubmit() {
      if (
        !this.adultNumber ||
        this.adultNumber > 5 ||
        !this.childNumber ||
        this.childNumber > 5
      ) {
        return;
      }

      let diffDay = JSON.stringify(
        (new Date(this.endDate).getTime() -
          new Date(this.startDate).getTime()) /
          (1000 * 3600 * 24)
      );
      this.diffDay = diffDay;
      if (diffDay <= 0) {
        return;
      }
      localStorage.setItem("selectedHotelName", JSON.stringify(this.hotelName));
      localStorage.setItem(
        "startDate",
        JSON.stringify(new Date(this.startDate).toLocaleDateString("tr-TR"))
      );
      localStorage.setItem(
        "endDate",
        JSON.stringify(new Date(this.endDate).toLocaleDateString("tr-TR"))
      );
      localStorage.setItem("adultNumber", JSON.stringify(this.adultNumber));
      localStorage.setItem("childNumber", JSON.stringify(this.childNumber));
      localStorage.setItem("diffDay", diffDay);
      this.$store.commit("setSelectedHotel", this.hotel);
      this.$store.commit("setStep", 1);
    },
  },

  computed: { ...mapGetters(["hotelList", "childStatus"]) },
  created() {
    this.fetchHotels();
  },
};
</script>

<style scoped lang="scss">
.date-selection {
  padding: 25px;
  border: 1px solid;
  border-color: $grey;
  @include border-radius(6px);
  margin-top: 1em;

  &__select {
    width: 100%;
    height: 30px;
    margin-bottom: 1em;
  }

  &__area {
    display: flex;
    flex-wrap: nowrap;
    @media only screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
  }

  &__box {
    width: 25%;
    border: 1px solid #000;
    padding: 5px 15px 20px;

    @media only screen and (max-width: 768px) {
      width: 100%;
    }

    .datepicker {
      display: flex;
      align-items: center;
    }

    .input {
      width: 90%;
      height: 20px;
    }

    .date-icon {
      height: 26px;
      width: 24px;
      padding: 0;
      cursor: pointer;
    }
  }

  &__title {
    font-size: 15px;
  }
}
</style>
