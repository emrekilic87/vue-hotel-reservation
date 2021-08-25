<template>
  <form class="pay-area" @submit.prevent="onSubmit">
    <div class="success" v-if="this.success != false">
      <h2 class="success-title" v-if="this.deleted == false">
        Rezervasyon Kaydınız Alınmıştır.
      </h2>
      <p class="success-text" v-if="this.isDelete == false">
        Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda
        değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri
        kullanabilirsiniz.
      </p>
      <p class="delete-reservation-text" v-if="this.isDelete != false">
        <span v-if="this.deleted == false"
          >Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?</span
        >
        <button
          class="btn"
          type="button"
          @click="deleteOk"
          v-if="this.deleted == false"
        >
          Evet
        </button>
        <button
          class="btn"
          type="button"
          @click="deleteCancel"
          v-if="this.deleted == false"
        >
          Hayır
        </button>
        <br />
        <span v-if="this.deleted != false">
          Kaydınız Başarıyla İptal Edilmiştir ..
        </span>
      </p>
      <div class="success-buttons">
        <button class="btn" type="button" @click="newReservation">
          Yeni Rezervasyon Yap
        </button>
        <button class="btn" type="button">Rezervasyonu Güncelle</button>
        <button class="btn" type="button" @click="deleteReservation">
          Rezervasyonu İptal Et
        </button>
      </div>
    </div>
    <div class="pay">
      <div class="pay__left" v-if="this.success == false">
        <div class="pay__left-card" :class="{ focused: focused }">
          <div class="pay__left-card-show-name">
            {{ cardName }}
          </div>
          <div class="pay__left-card-show-number">
            {{ cardNumber }}
          </div>
          <div class="pay__left-card-show-monthYear">
            {{ month }} / {{ year }}
          </div>
          <div class="pay__left-card-show-cvv">
            {{ cvv }}
          </div>
          <img
            class="pay__left-card-image"
            src="images/kart-image.JPG"
            alt=""
          />
        </div>

        <div class="pay__left-card-info">
          <h2 class="pay__left-card-info-title">Kart Bilgileri</h2>

          <div class="pay__left-card-info-name">
            <h3 class="pay__left-card-info-subtitle">
              Kart Üzerindeki İsim
            </h3>
            <input
              type="text"
              placeholder="Kart Üzerindeki İsmi Giriniz"
              v-model="cardName"
              :required="true"
            />
            <div class="error" v-if="!this.cardNameStatus">
              Lütfen İsminizi Giriniz
            </div>
          </div>

          <div class="pay__left-card-info-number">
            <h3 class="pay__left-card-info-subtitle">
              Kartın Numarası
            </h3>
            <input
              type="text"
              placeholder="Kartın Numarasını Giriniz"
              v-model="cardNumber"
              :required="true"
              @keypress="isNumber($event)"
              maxlength="16"
            />
            <div class="error" v-if="!this.cardNumberStatus">
              Lütfen Kart Numaranızı Giriniz
            </div>
          </div>

          <div class="pay__left-card-info-expire">
            <div class="pay__left-card-info-expire-left">
              <h3 class="pay__left-card-info-subtitle">
                Kart son kullanma tarihi
              </h3>
              <select
                class="pay__left-card-info-expire-select"
                name="month"
                v-model="month"
                :required="true"
              >
                <option disabled value="">AY</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select
                class="pay__left-card-info-expire-select"
                name="year"
                v-model="year"
                :required="true"
              >
                <option disabled value="">Yıl</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
              </select>
            </div>

            <div class="pay__left-card-info-expire-right">
              <h3 class="pay__left-card-info-subtitle">
                CVV
              </h3>

              <input
                type="text"
                placeholder="CVV Giriniz"
                v-model="cvv"
                :required="true"
                @keypress="isNumber($event)"
                maxlength="3"
                @focus="focused = true"
                @blur="focused = false"
              />

              <div class="error" v-if="!this.cvvStatus">
                Lütfen CVV Giriniz
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pay__right">
        <h2 class="pay__right-title">
          {{ this.selectedHotelName }} ({{ this.roomTypes[0].city }})
        </h2>

        <div class="pay__right-boxarea">
          <div class="pay__right-box">
            <p class="pay__right-box-title">
              Giriş Tarihi:
            </p>
            <p class="pay__right-box-value">
              {{ selectedStartDate }}
            </p>
          </div>

          <div class="pay__right-box">
            <p class="pay__right-box-title">
              Çıkış Tarihi:
            </p>
            <p class="pay__right-box-value">
              {{ selectedEndDate }}
            </p>
          </div>

          <div class="pay__right-box">
            <p class="pay__right-box-title">
              Yetişkin:
            </p>
            <p class="pay__right-box-value">
              {{ adultNumber }}
            </p>
          </div>

          <div class="pay__right-box">
            <p class="pay__right-box-title">
              Çocuk:
            </p>
            <p class="pay__right-box-value">
              {{ childNumber }}
            </p>
          </div>

          <div class="pay__right-box">
            <p class="pay__right-box-title">
              Oda Tipi:
            </p>
            <p class="pay__right-box-value">
              {{ selectRoomTypeTitle }}
            </p>
          </div>

          <div class="pay__right-box">
            <p class="pay__right-box-title">
              Manzara:
            </p>
            <p class="pay__right-box-value">
              {{ selectViewTypeTitle }}
            </p>
          </div>
        </div>

        <div class="pay__right-coupon" v-if="this.success == false">
          <input
            type="text"
            class="pay__right-coupon-input"
            placeholder="Kupon Kodu"
          />
          <button class="btn" type="button">Kodu Kullan</button>
        </div>

        <div class="pay__right-total">
          <div class="pay__right-total-row">
            <span class="pay__right-total-subtitle"> Oda Fiyatı </span>
            <span class="pay__right-total-value"
              >{{ selectedRoomPrice }} TL</span
            >
          </div>
          <div class="pay__right-total-row">
            <span class="pay__right-total-subtitle"> Fiyat Etki Oranı </span>
            <span class="pay__right-total-value">
              %{{ selectedViewPriceRate }}</span
            >
          </div>
          <div class="pay__right-total-row">
            <span class="pay__right-total-subtitle">
              Konaklama ({{ diffDay }} Gün)
            </span>
            <span class="pay__right-total-value">
              {{ selectedRoomPriceTotal }} TL</span
            >
          </div>

          <div class="pay__right-total-amount">
            <p class="pay__right-total-amount-title">
              TOPLAM TUTAR
            </p>
            <p class="pay__right-total-amount-price">
              {{
                Math.round(
                  selectedRoomPriceTotal +
                    (selectedRoomPriceTotal * selectedViewPriceRate) / 100
                )
              }}
              TL
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.success == false">
      <NextPrev />
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NextPrev from "./NextPrev.vue";
import axios from "axios";

export default {
  name: "Payment",

  components: {
    NextPrev,
  },

  data() {
    return {
      hotel_id: parseInt(JSON.parse(localStorage.getItem("selectedHotel"))),
      selectedHotelName: JSON.parse(localStorage.getItem("selectedHotelName")),
      selectedStartDate: JSON.parse(localStorage.getItem("startDate")),
      selectedEndDate: JSON.parse(localStorage.getItem("endDate")),
      adultNumber: JSON.parse(localStorage.getItem("adultNumber")),
      childNumber: JSON.parse(localStorage.getItem("childNumber")),
      diffDay: JSON.parse(localStorage.getItem("diffDay")),
      selectedRoom: JSON.parse(localStorage.getItem("selectedRoom")),
      selectedView: JSON.parse(localStorage.getItem("selectedView")),
      selectRoomTypeTitle: JSON.parse(
        localStorage.getItem("selectRoomTypeTitle")
      ),
      selectViewTypeTitle: JSON.parse(
        localStorage.getItem("selectViewTypeTitle")
      ),
      selectedRoomPrice: JSON.parse(localStorage.getItem("selectedRoomPrice")),
      selectedRoomPriceTotal: JSON.parse(
        localStorage.getItem("selectedRoomPriceTotal")
      ),
      selectedViewPriceRate: JSON.parse(
        localStorage.getItem("selectedViewPriceRate")
      ),
      cardName: "",
      cardNameStatus: true,
      cardNumber: "",
      cardNumberStatus: true,
      month: "",
      year: "",
      cvv: "",
      cvvStatus: true,
      success: false,
      focused: false,
      isDelete: false,
      responseId: "",
      deleted: false,
    };
  },

  computed: {
    ...mapGetters(["steps", "thisStep", "roomTypes"]),
  },

  created() {
    this.fetchRoomType(JSON.parse(localStorage.getItem("selectedHotel")));
  },

  methods: {
    ...mapActions(["fetchRoomType"]),

    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    onSubmit() {
      if (!this.cardName) {
        this.cardNameStatus = false;
        return;
      } else {
        this.cardNameStatus = true;
      }
      if (!this.cardNumber) {
        this.cardNumberStatus = false;
        return;
      } else {
        this.cardNumberStatus = true;
      }
      if (!this.cvv) {
        this.cvvStatus = false;
        return;
      } else {
        this.cvvStatus = true;
      }

      let startDay = this.selectedStartDate.split(".")[0];
      let startMount = this.selectedStartDate.split(".")[1];
      let startYear = this.selectedStartDate.split(".")[2];

      let newStartDate = startYear + "-" + startMount + "-" + startDay;

      let endDay = this.selectedEndDate.split(".")[0];
      let endMount = this.selectedEndDate.split(".")[1];
      let endYear = this.selectedEndDate.split(".")[2];

      let newEndDate = endYear + "-" + endMount + "-" + endDay;
      let responseId = [];

      axios
        .post(
          "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings",
          {
            hotel_id: this.hotel_id,
            start_date: newStartDate,
            end_date: newEndDate,
            adult: parseInt(this.adultNumber),
            child: parseInt(this.childNumber),
            room_type: this.selectedRoom,
            room_scenic: this.selectedView,
            price: Math.round(
              this.selectedRoomPriceTotal +
                (this.selectedRoomPriceTotal * this.selectedViewPriceRate) / 100
            ),
            coupon_code: "",
            card_name: this.cardName,
            card_number: this.cardNumber,
            card_date_month: this.month,
            card_date_year: this.year,
            card_cvv: this.cvv,
          }
        )
        .then(function(response) {
          responseId.push(response.data.id);
        });

      setTimeout(() => {
        this.success = true;
        this.responseId = responseId;  
      }, 2000);
      
    },

    newReservation() {
      localStorage.clear();
      location.reload();
    },

    deleteReservation() {
      this.isDelete = true;
    },

    deleteOk() {
      let deleted = [];
      axios
        .delete(
          `https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/${this.responseId[0]}`
        )
        .then(function(response) {
          deleted.push(response.status);
        });

      setTimeout(() => {
        if (deleted == 200) {
          this.deleted = true;
        }
      }, 3000);
    },

    deleteCancel() {
      this.isDelete = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.pay {
  display: flex;
  justify-content: center;
  margin: 1em 0;

  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }

  .pay__left {
    padding: 20px;
    width: 100%;
    border: 1px solid;
    border-color: $grey;
    @include border-radius(8px);
    margin-right: 1em;

    @media only screen and (max-width: 992px) {
      margin-right: 0;
      padding: 20px 0;
      margin-bottom: 1em;
    }

    &-card {
      position: relative;
      transition: 0.5s all;

      &.focused {
        transform: rotateY(180deg);
      }
      &-show-name {
        position: absolute;
        top: 53%;
        z-index: 111111;
        right: 0;
        left: 0;
        background-color: #f3f3f3;
        height: 60px;
        width: 95%;
        margin: 0 auto;
        text-indent: 7%;
        font-weight: bold;

        @media only screen and (max-width: 768px) {
          height: 35px;
        }
      }

      &-show-number {
        position: absolute;
        top: 65%;
        z-index: 111111;
        right: 0;
        left: 13px;
        background-color: #f3f3f3;
        height: 60px;
        width: 50%;
        text-indent: 14%;
        font-weight: bold;
        @media only screen and (max-width: 768px) {
          height: 45px;
        }
      }

      &-show-monthYear {
        position: absolute;
        top: 75%;
        z-index: 111111;
        right: 0;
        left: 13px;
        background-color: #f3f3f3;
        height: 60px;
        width: 50%;
        text-indent: 14%;
        font-weight: bold;
        @media only screen and (max-width: 768px) {
          height: 45px;
        }
      }

      &-show-cvv {
        position: absolute;
        top: 35%;
        z-index: 111111;
        right: 0;
        left: 0;
        background-color: #f3f3f3;
        height: 60px;
        width: 20%;
        text-indent: 14%;
        font-weight: bold;
        visibility: hidden;
        margin: 0 auto;
        @media only screen and (max-width: 768px) {
          height: 25px;
        }
      }

      &.focused {
        .pay__left-card-show-cvv {
          transform: rotateY(-180deg);
          text-align: center;
          visibility: visible;
        }
      }
    }

    &-card-image {
      width: 100%;
    }

    &-card-info {
      border: 1px solid;
      border-color: #000;
      margin-top: 1em;
      padding: 20px;
      position: relative;

      @media only screen and (max-width: 992px) {
        padding: 20px 25px;
      }

      &-title {
        position: absolute;
        top: -9px;
        margin: 0;
        font-size: 15px;
        background-color: #fff;
        padding: 0 5px;
        left: 10px;
      }

      &-subtitle {
        margin: 0 0 5px;
        font-weight: 400;
        font-size: 13px;
        margin-top: 2em;
      }

      input {
        height: 20px;
        width: 100%;
      }

      &-expire {
        display: flex;
        justify-content: space-between;

        &-left {
          width: 100%;
        }

        &-select {
          width: 85px;
          height: 25px;
          margin-right: 15px;

          @media only screen and (max-width: 992px) {
            width: 35%;
          }
        }
      }
    }
  }

  .pay__right {
    padding: 20px;
    width: 60%;
    background-color: $grey;
    @include border-radius(8px);

    @media only screen and (max-width: 992px) {
      padding: 20px 0;
      width: 100%;
    }

    &-title {
      margin-top: 0;
      @media only screen and (max-width: 992px) {
        text-align: center;
      }
    }

    &-boxarea {
      display: flex;
      flex-wrap: wrap;
    }

    &-box {
      background-color: #fff;
      @include border-radius(8px);
      width: 46%;
      margin: 5px;
      text-align: center;

      &-title {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 0px;
      }
      &-value {
        margin-top: 0px;
        font-size: 13px;
      }
    }

    &-coupon {
      background-color: #fff;
      margin: 5px;
      @include border-radius(8px);
      padding: 12px;
      display: flex;
      justify-content: space-between;

      &-input {
        width: 55%;
      }

      .btn {
        padding: 7px 15px;
      }
    }

    &-total {
      background-color: #fff;
      margin: 10px 5px;
      @include border-radius(8px);
      padding: 25px 15px;

      &-row {
        margin-bottom: 1em;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }

      &-subtitle {
        font-weight: bold;
      }

      &-amount {
        text-align: center;
        padding: 15px;
        border-top: 1px solid;
        border-color: $grey;
        margin-top: 25px;
        font-weight: bold;

        &-price {
          font-size: 35px;
          margin: 0;
        }
      }
    }
  }
}

.success {
  text-align: center;
  border: 1px solid;
  border-color: $grey;
  @include border-radius(8px);
  margin: 1em 0;
  padding: 10px 15% 25px;

  &-title {
    @media only screen and (max-width: 992px) {
      font-size: 18px;
    }
  }

  &-text {
    @media only screen and (max-width: 992px) {
      font-size: 15px;
    }
  }

  .btn {
    margin: 5px;

    @media only screen and (max-width: 992px) {
      font-size: 10px;
      width: 100%;
    }
  }
}
</style>
