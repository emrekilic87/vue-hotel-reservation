<template>
  <header class="header">
    <div class="wrapper">
      <div class="title-area">
        <h1 class="title-area__title">Otel</h1>
        <h3 class="title-area__subtitle">Rezervasyon Sistemi</h3>
      </div>

      <a class="wrapper__button btn" @click="newReservation">Yeni Rezervasyon Yap</a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods : {
    newReservation() {
      localStorage.clear();
      location.reload();
    }
  }
}
</script>

<style scoped lang="scss">
.header{
  background-color: $blue;
  .wrapper{
    padding: 15px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-area{
      color: $text-white;
      &__title{
        margin: 0 0 5px;
      }

      &__subtitle{
        margin: 0;
        font-size: 13px;
      }
    }

    &__button{
      background-color: $grey;
      color: $text-black;
    }
  }
}
</style>
