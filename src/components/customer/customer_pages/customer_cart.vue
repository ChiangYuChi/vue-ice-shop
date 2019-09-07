<!-- 購物車 -->
<template>
  <div>
    <div class="basketIcon">
      <div class="basketButton" @click.prevent="openBox = !openBox">
        <i class="fas fa-cart-plus"></i>
      </div>
      <div class="basketList" v-show="openBox">
        <div class="basketMenu" v-if="cart.carts.length !==0">
          <h6>已選擇商品</h6>
          <div class="basketMenuScroll">
            <table class="table table-sm">
              <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeCartItem(item.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle productTitle">
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                  </td>
                  <td class="align-middle text-right">{{item.qty}}</td>
                  <td class="align-middle text-right">{{item.final_total}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right">總計</td>
                  <td class="text-right">{{cart.total}}</td>
                </tr>
                <tr v-if="cart.final_total !==cart.total">
                  <td colspan="3" class="text-right text-success">折扣價</td>
                  <td class="text-right text-success">{{ cart.final_total }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="input-group mb-1 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
            </div>
          </div>
        </div>
        <div class="emptyCartText">
          <p
            v-if="cart.carts.length ==0"
            class="d-block btn btn-sm bg-danger text-light mt-1 mb-1"
          >購物車還空空的</p>
          <router-link
            v-else
            to="/customerorder"
            class="d-block btn btn-sm bg-danger text-light"
          >結帳去</router-link>
        </div>
      </div>
      <div class="totalItems" v-if="cart.carts.length !==0">
        <span>{{cart.carts.length}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      openBox: false,
      id: this.$route.params.id,
      products: [],
      product: {},
      cart: {},
      coupon_code: ""
    };
  },
  methods: {
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.$http.delete(url).then(() => {
        vm.getCart();
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then(response => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoadings = true;
      this.$http.get(url).then(response => {
        if (response.data.success) {
          vm.cart = response.data.data;
        }
      });
    }
  },
  created() {
    this.getCart();
    this.$bus.$on("emitGetCart", this.getCart);
  },
  beforeDestroy() {
    this.$bus.$off("emitGetCart", this.getCart);
  }
};
</script>
<style lang="scss" scoped>
.basketIcon {
  width: 50px;
  height: 50px;
  color: #656565;
  border: 1px solid #656565;
  border-radius: 50%;
  font-size: 16px;
  font-family: "MStiffHeiHK";
  padding-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  bottom: 3%;
  right: 1%;

  .fa-cart-plus {
    font-size: 30px;
    padding-bottom: 15px;
    &:hover {
      color: black;
      cursor: pointer;
      cursor: pointer;
    }
  }

  .basketMenuScroll {
    max-height: 60vh;
    overflow-y: auto;
    margin: 5px 0 15px;
  }

  .basketList {
    width: 370px;
    background-color: white;
    color: black;
    bottom: 90px;
    border: 1px solid grey;
    border-radius: 8px;
    position: absolute;
    right: 0;
    padding: 8px;
    display: block;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border: 1px solid #dee2e6;
    transition: transform 500ms ease-in-out;
  }

  .productTitle {
    color: #66bb3c;
  }

  h6 {
    font-size: 20px;
  }

  .closeBasketMenu {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    font-size: 20px;
    right: 0;
    bottom: 0;
    color: black;

    cursor: pointer;
  }

  .totalItems {
    background: #f49600;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    font-size: 0.7rem;
    padding: 0 6px;
    position: absolute;
    right: 0;
    top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>