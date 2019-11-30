<template>
  <div>
    <div class="couponContainer">
      <h2>Lucky Turn</h2>
      <div class="luckyWheel">
        <div class="pointerContainer" @click.prevent="getRandom()">
          <div class="pointer"></div>
          <div class="pointCenter">
            <span>CLICK ME</span>
          </div>
        </div>
        <div class="container">
          <div class="itemContentOne item">
            <div class="itemContent">
              <i class="fas fa-smile"></i>
              <span>Luck</span>
            </div>
          </div>
          <div class="itemContentTwo item">
            <div class="itemContent">
              <i class="fas fa-crown"></i>
              <span>Coin</span>
            </div>
          </div>
          <div class="itemContentThree item">
            <div class="itemContent">
              <i class="fas fa-smile"></i>
              <span>Win</span>
            </div>
          </div>
          <div class="itemContentFour item">
            <div class="itemContent">
              <i class="fas fa-crown"></i>
              <span>Happy</span>
            </div>
          </div>
          <div class="itemContentFive item">
            <div class="itemContent">
              <i class="fas fa-smile"></i>
              <span>Game</span>
            </div>
          </div>
          <div class="itemContentSix item">
            <div class="itemContent">
              <i class="fas fa-crown"></i>
              <span>Dollar</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade p-0"
        id="couponModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="couponModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered d-flex justify-content-center"
          role="document"
        >
          <div class="modal-bg"></div>
          <div class="modal-content bg-transparent border-0 text-center">
            <div class="modal-body" style="margin-top: 5rem">
              <div class="mb-md-5 pb-md-5 pb-4">
                <h3 class="mb-3">恭喜您獲得</h3>
                <h3 class="mb-3 model-text">{{ prize.name }}</h3>
                <h4>
                  <span class="badge badge-success px-5 py-2">{{ prize.coupon_code }}</span>
                </h4>
              </div>
              <div class="text-center">
                <router-link class="btn btn-danger mr-5" to="/" data-dismiss="modal">馬上購物去</router-link>
                <button
                  class="btn btn-secondary"
                  @click.prevent="resetBtn()"
                  data-dismiss="modal"
                >再轉一次</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      start: true,
      coupon: [
        {
          couponId: 1,
          name: "參加獎，九折優惠卷",
          coupon_code: "icemonster9"
        },
        { couponId: 2, name: "八折優惠卷", coupon_code: "icemonster8" },
        { couponId: 3, name: "六折優惠卷", coupon_code: "icemonster6" },
        { couponId: 4, name: "四折優惠卷", coupon_code: "icemonster4" },
        { couponId: 5, name: "三折優惠卷", coupon_code: "icemonster3" },
        { couponId: 6, name: "最大獎，一折優惠卷", coupon_code: "icemonster1" }
      ],
      deg: 0,
      prize: {
        name: "",
        coupon_code: ""
      }
    };
  },
  methods: {
    getRandom() {
      const vm = this;
      const n = Math.floor(Math.random() * 8); //點擊之後取得隨機數字
      if (vm.start) {
        switch (n) {
          default:
            vm.rotateTurntable(0, n);
            break;
          case 1:
            vm.rotateTurntable(45, n);
            break;
          case 2:
            vm.rotateTurntable(90, n);
            break;
          case 3:
            vm.rotateTurntable(135, n);
            break;
          case 4:
            vm.rotateTurntable(180, n);
            break;
          case 5:
            vm.rtoateTurntable(225, n);
            break;
          case 6:
            vm.rotateTurntable(270, n);
            break;
          case 7:
            vm.rotateTurntable(315, n);

            break;
        }
      } else {
        vm.resetBtn();
      }
    },
    rotateTurntable(deg, n) {
      const vm = this;
      const d = Number(deg) + 1440;
      let prizeNumber;
      $(".pointer").addClass("rotateStrat");
      $(".pointer").css("transform", `rotate(${d}deg)`);
      if (n === 7) {
        prizeNumber = 1;
      } else if (n === 5) {
        prizeNumber = 4;
      } else if (n === 3) {
        prizeNumber = 3;
      } else if (n === 1) {
        prizeNumber = 2;
      } else {
        prizeNumber = 0;
      }
      vm.prize = vm.coupon[prizeNumber];
      setTimeout(() => {
        $("#couponModal").modal("show");
      }, 5000);
      vm.start = false;
    },
    resetBtn() {
      const vm = this;
      vm.start = true;
      $(".pointer").removeClass("rotateStrat");
      $(".pointer").css("transform", "rotate(0deg)");
    }
  }
};
</script>

<style lang="scss" scoped>
.couponContainer {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  background-image: url(../../../assets/img/couponbackground.jpg);
  background-position-x: center;
  background-position-y: center;
  background-size: cover;

  h2 {
    color: rgb(211, 151, 59);
    margin: 0 auto 10px 0;
    font-family: "SignPainter-HouseScript";
    text-align: center;
    padding: 10px;
    font-size: 80px;
  }
  .luckyWheel {
    width: 550px;
    height: 550px;

    margin: 10px auto 0px auto;

    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    border: 3px solid rgb(211, 151, 59);
    .container {
      width: 520px;
      height: 520px;

      border-radius: 50%;
      position: relative;
      overflow: hidden;
      display: flex;

      .item {
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 50%;
        transform-origin: 0% 100%;
        .itemContent {
          display: flex;
          width: 100px;
          height: 100px;
          align-items: center;
          flex-direction: column;
          transform-origin: center center;
          transform: skewY(30deg) rotate(30deg) translate(-95px, 62px);
          position: absolute;
          right: 0;
          bottom: 0;
          font-size: 2rem;
          color: white;
          span {
            font-family: "MStiffHeiHK";
          }
        }
      }

      .itemContentOne {
        transform: rotate(30deg) skewY(-30deg);
        background: linear-gradient(left, #ffc425, #ccff2598);
      }
      .itemContentTwo {
        transform: rotate(-30deg) skewY(-30deg);
        background: linear-gradient(left, #ee3124, #ff25be98);
      }
      .itemContentThree {
        transform: rotate(-90deg) skewY(-30deg);
        background: linear-gradient(left, #ffc425, #ccff2598);
      }
      .itemContentFour {
        transform: rotate(-150deg) skewY(-30deg);
        background: linear-gradient(left, #ee3124, #ff25be98);
      }
      .itemContentFive {
        transform: rotate(-210deg) skewY(-30deg);
        background: linear-gradient(left, #ffc425, #ccff2598);
      }
      .itemContentSix {
        transform: rotate(-270deg) skewY(-30deg);
        background: linear-gradient(left, #ee3124, #ff25be98);
      }
    }

    .pointerContainer {
      display: flex;
      width: 128px;
      height: 208px;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      z-index: 999;
      position: absolute;
      font-size: 2rem;
      cursor: pointer;

      .pointer {
        width: 88px;
        height: 158px;
        display: block;
        background-image: url("../../../assets/img/long-arrow-pointing-up.png");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        transform-origin: center bottom;
        bottom: 50%;
        left: 16%;
        z-index: 9999;
        // transform-origin: 64px 144px;
      }

      .pointCenter {
        width: 100px;
        height: 100px;
        position: absolute;
        bottom: 25%;
        left: 10%;
        z-index: 9999;
        background-color: red;
        border-radius: 50%;
        border: 3px solid rgb(211, 151, 59);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        font-weight: bold;

        span {
          font-size: 20px;
          color: white;
        }
      }

      .rotateStrat {
        transition: transform 5s;
        transition-timing-function: cubic-bezier(0.1, 0.5, 0.2, 1);
      }
    }
  }

  .modal-bg {
    width: 512px;
    height: 512px;
    background: linear-gradient(left, #f09819, #3cd3ad);
    position: absolute;
    border-radius: 10px;
  }
}

@media (max-width: 414px) {
  .couponContainer {
    width: 100%;
    height: 600px;
    margin: 0 auto;

    .luckyWheel {
      width: 350px;
      height: 350px;

      .container {
        width: 320px;
        height: 320px;

        .item {
          .itemContent {
            display: flex;
            width: 60px;
            height: 90px;
            transform: skewY(30deg) rotate(30deg) translate(-45px, 62px);
            font-size: 1.5rem;
          }
        }
      }

      .pointerContainer {
        display: flex;
        width: 128px;
        height: 208px;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        z-index: 999;
        position: absolute;
        font-size: 2rem;
        cursor: pointer;

        .pointer {
          width: 48px;
          height: 108px;
          display: block;
          background-image: url("../../../assets/img/long-arrow-pointing-up.png");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          position: absolute;
          transform-origin: center bottom;
          bottom: 50%;
          left: 31%;
          z-index: 9999;
        }
      }
    }
  }
}
</style>