<template>
  <div class="slideWrap">
    <div class="swiperContainer">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="slide slide_one">
            <div class="slide-square"></div>
            <div class="slide-content">
              <h3>麥好冰</h3>
              <p>水果冰品第一品牌</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide slide_two">
            <div class="slide-square"></div>
            <div class="slide-content vertical">
              <h3>宅配服務</h3>
              <p>
                滿
                <span>2000</span>即享免運
              </p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide slide_three">
            <div class="slide-square"></div>
            <div class="slide-content">
              <h3>嚴選在地原料</h3>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        sildesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 3500
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss" scoped>
.slideWrap {
  position: relative;
  width: 100%;
  height: 540px;

  .slide {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .slide_one {
    background-image: url("../../assets/img/keyvisual_2.jpg");
    width: 100%;
    height: 540px;
  }
  .slide_two {
    background-image: url("../../assets/img/keyvisual_4.jpg");
    width: 100%;
    height: 540px;

    .vertical {
      writing-mode: vertical-lr;
      display: flex;
      flex-direction: column-reverse;

      span {
        writing-mode: horizontal-tb;
      }
    }
  }

  .slide_three {
    background-image: url("../../assets/img/keyvisual_3.jpg");
    width: 100%;
    height: 540px;
  }

  .slide-square {
    flex: 1.5;
    margin: 2.5rem;
    border: solid white 3px;
  }

  .slide-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.5);
    color: #3e5214;
    text-align: center;
    font-family: "STYuanti-TC-Light";

    h3 {
      font-size: 60px;
      font-weight: bold;
    }

    p {
      font-size: 30px;
      font-weight: bold;
    }

    span {
      color: red;
      padding: 10px;
    }
  }
}
@media (max-width: 768px) {
  .slideWrap {
    width: 100%;
    height: 400px;
    margin: 0 auto;
    background: rgb(255, 244, 216);
    .slide {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 400px;
      position: relative;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .slide-content {
      h3 {
        font-size: 30px;
        font-weight: bold;
      }

      p {
        font-size: 20px;
      }
    }

    .slide_two {
      .vertical {
        writing-mode: horizontal-tb;
        display: flex;
        flex-direction: column-reverse;

        span {
          writing-mode: horizontal-tb;
        }
      }
    }
  }
}
</style>