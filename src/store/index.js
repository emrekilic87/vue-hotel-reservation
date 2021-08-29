import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    steps: [
      {
        number: 1,
        title: "Otel ve Tarih Seçimi",
        isActive: true,
        finished: false,
      },
      {
        number: 2,
        title: "Oda Tipi ve Manzara Seçimi",
        isActive: false,
        finished: false,
      },
      {
        number: 3,
        title: "Önizleme ve Ödeme İşlemleri",
        isActive: false,
        finished: false,
      }
    ],
    thisStep: JSON.parse(localStorage.getItem("thisStep")) || {
      number: 1,
      title: "Otel ve Tarih Seçimi",
      isActive: true,
      finished: false,
    },
    hotels: [],
    selectedHotel: "",
    roomTypes: [],
    childStatus: true,
  },
  mutations: {
    setStep(state, value) {
      state.steps.map((step) => {
        if (step.number === value) {
          (step.isActive = false), (step.finished = true);
        }

        if (step.number === value + 1) {
          step.isActive = true;
          state.thisStep = step;
          localStorage.setItem("thisStep", JSON.stringify(state.thisStep));
        }
      });
    },
    setHotels(state, hotels) {
      state.hotels = hotels;
    },
    setSelectedHotel(state, selectedHotel){
      state.selectedHotel = localStorage.setItem("selectedHotel", JSON.stringify(selectedHotel));
    },
    setRoomTypes(state, roomTypes) {
      state.roomTypes = roomTypes;
    },
    setChildStatus(state, childStatus) {
      state.childStatus = childStatus;
    },
  },
  actions: {
    async fetchHotels({ commit }) {
      const response = await axios.get(
        "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels"
      );
      commit("setHotels", response.data);
    },

    async fetchRoomType({ commit }, hotelId) {
      const response = await axios.get(
        `https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details?hotel_id=${hotelId}`
      );
      commit("setRoomTypes", response.data);
    },

    async fetcChildStatus({ commit }, hotelId) {
      const response = await axios.get(
        `https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details/${hotelId}`
      );
      commit("setChildStatus", response.data.child_status);
    },
  },
  getters: {
    steps: (state) => {
      return state.steps;
    },
    thisStep: (state) => {
      return state.thisStep;
    },
    hotelList: (state) => {
      return state.hotels;
    },
    selectedHotel: (state) => {
      return state.selectedHotel;
    },
    roomTypes: (state) => {
      return state.roomTypes;
    },
    childStatus: (state) => {
      return state.childStatus;
    },
  },
});
