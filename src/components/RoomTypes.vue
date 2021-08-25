<template>
  <form class="room-types" @submit.prevent="onSubmit">
    <div class="info">
      <h2 class="info__hotel">
        {{ this.selectedHotelName }} ({{ this.roomTypes[0].city }})
      </h2>

      <span class="info__title">
        Giriş Tarihi:
      </span>
      <span class="info__start-date">
        {{ selectedStartDate }}
      </span>
      <span class="info__title">
        Çıkış Tarihi:
      </span>
      <span class="info__end-date">
        {{ selectedEndDate }}
      </span>
      <span class="info__title">
        Yetişkin:
      </span>
      <span class="info__adult-number">
        {{ adultNumber }}
      </span>
      <span class="info__title">
        Çocuk:
      </span>
      <span class="info__child-number">
        {{ childNumber }}
      </span>
    </div>

    <div class="room-types__selection">
      <h2 class="room-types__selection-title">Oda Tipi Seçimi</h2>
      <div class="room-types__box-area">
        <div
          class="room-types__box"
          :class="{ active: roomType.id == selectedRoom }"
          @click="selectRoomType(roomType.id, roomType.price, roomType.title)"
          v-for="roomType in roomTypes[0].room_type"
          :key="roomType.title"
        >
          <h3 class="room-types__box-title">
            {{ roomType.title }}
          </h3>
          <img class="room-types__box-image" :src="roomType.photo" alt="" />
          <div class="room-types__box-texts">
            <div class="room-types__box-texts-left">
              <span class="room-types__box-texts-text">
                {{ diffDay }} gün
              </span>
              <br />
              <span class="room-types__box-texts-text">
                {{ adultNumber }} yetişkin
              </span>
            </div>

            <div class="room-types__box-texts-right">
              <span class="room-types__box-texts-number">
                {{ diffDay * adultNumber * roomType.price }} TL
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="room-types__selection view">
      <h2 class="room-types__selection-title">Manzara Seçimi</h2>
      <div class="room-types__box-area">
        <div
          class="room-types__box"
          :class="{ active: roomScenic.id == selectedView }"
          @click="
            selectView(roomScenic.id, roomScenic.price_rate, roomScenic.title)
          "
          v-for="roomScenic in roomTypes[0].room_scenic"
          :key="roomScenic.title"
        >
          <h3 class="room-types__box-title">
            {{ roomScenic.title }}
          </h3>
          <img class="room-types__box-image" :src="roomScenic.photo" alt="" />
          <div class="room-types__box-texts">
            <div class="room-types__box-texts-left">
              <span class="room-types__box-texts-text">
                Fiyat Etki Oranı
              </span>
              <br />
            </div>

            <div class="room-types__box-texts-right">
              <span class="room-types__box-texts-number">
                + {{ roomScenic.price_rate }} %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <NextPrev />
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NextPrev from "./NextPrev.vue";

export default {
  name: "RoomTypes",

  data() {
    return {
      selectedHotelName: JSON.parse(localStorage.getItem("selectedHotelName")),
      selectedStartDate: JSON.parse(localStorage.getItem("startDate")),
      selectedEndDate: JSON.parse(localStorage.getItem("endDate")),
      adultNumber: JSON.parse(localStorage.getItem("adultNumber")),
      childNumber: JSON.parse(localStorage.getItem("childNumber")),
      diffDay: JSON.parse(localStorage.getItem("diffDay")),
      selectedRoom: "",
      selectedRoomPrice: "",
      selectedRoomPriceTotal: "",
      selectedView: "",
      selectedViewPriceRate: "",
      selectRoomTypeTitle: "",
      selectViewTypeTitle: "",
    };
  },

  computed: {
    ...mapGetters(["steps", "thisStep", "roomTypes"]),
  },

  components: {
    NextPrev,
  },

  created() {
    this.fetchRoomType(JSON.parse(localStorage.getItem("selectedHotel")));
  },

  methods: {
    ...mapActions(["fetchRoomType"]),

    selectRoomType(id, price, title) {
      this.selectedRoom = id;
      this.selectedRoomPrice = price;
      this.selectedRoomPriceTotal = price * this.adultNumber * this.diffDay;
      this.selectRoomTypeTitle = title;
    },

    selectView(id, price_rate, title) {
      this.selectedView = id;
      this.selectedViewPriceRate = price_rate;
      this.selectViewTypeTitle = title;
    },

    onSubmit() {
      if(!this.selectedRoom || !this.selectedView){
        alert('Oda Seçimi ve Manzara Seçilmesi Zorunludur')
        return
      }
      localStorage.setItem(
        "selectedRoomPrice",
        JSON.stringify(this.selectedRoomPrice)
      );
      localStorage.setItem(
        "selectedRoomPriceTotal",
        JSON.stringify(this.selectedRoomPriceTotal)
      );
      localStorage.setItem(
        "selectedViewPriceRate",
        JSON.stringify(this.selectedViewPriceRate)
      );
      localStorage.setItem("selectedRoom", JSON.stringify(this.selectedRoom));
      localStorage.setItem("selectedView", JSON.stringify(this.selectedView));
      localStorage.setItem(
        "selectRoomTypeTitle",
        JSON.stringify(this.selectRoomTypeTitle)
      );
      localStorage.setItem(
        "selectViewTypeTitle",
        JSON.stringify(this.selectViewTypeTitle)
      );
      this.$store.commit("setStep", 2);
    },
  },
};
</script>

<style scoped lang="scss">
.room-types {
  margin-top: 1em;

  .info {
    background-color: $grey;
    @include border-radius(6px);
    padding: 1px 15px 20px;

    @media only screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    &__title {
      font-weight: bold;
      position: relative;
      margin-left: 10px;

      &::before {
        content: "-";
        position: absolute;
        top: 0;
        left: -10px;
        font-weight: 400;
      }

      &:first-of-type {
        margin-left: 0;
        &::before {
          display: none;
        }
      }
    }
    span {
      font-size: 14px;

      @media only screen and (max-width: 768px) {
        margin-bottom: 10px;
      }
    }
  }

  &__selection {
    margin-bottom: 1em;
    &-title {
      font-weight: bold;
      font-size: 15px;
      border-bottom: 1px solid;
      border-color: $grey;
      padding-bottom: 10px;

      @media only screen and (max-width: 768px) {
        text-align: center;
      }
    }
  }

  &__box-area {
    display: flex;
    @media only screen and (max-width: 992px) {
      flex-wrap: wrap;
    }
  }

  &__box {
    border: 1px solid;
    border-color: $grey;
    @include border-radius(4px);
    width: 27%;
    padding: 15px 30px;
    margin: 0 5px 15px;
    cursor: pointer;
    transition: .3s all;

    @media only screen and (max-width: 992px) {
      width: 100%;
    }

    &.active,
    &:hover {
      border-color: #00f300;
    }

    &-title {
      font-size: 13px;
      font-weight: bold;
    }
    &-image {
      display: block;
      margin: 4px 0 10px;
      width: 100%;
    }
    &-texts {
      display: flex;
      justify-content: space-between;

      &-text {
        font-size: 13px;
      }

      &-number {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
