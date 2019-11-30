<template>
  <!-- https://codepen.io/nuel/pen/grgyqv -->
  <div>
    <div class="shippingDetail">
      <h5 v-if="cart.carts.length !==0">請確認購買清單與填寫資料</h5>
      <div class="shipping" v-if="cart.carts.length !==0">
        <h6>付款人資訊</h6>
        <form action="#" @submit.prevent="createOrder">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              placeholder="請輸入 Email"
              v-validate="'required|email'"
              v-model="form.user.email"
            />
            <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
          </div>
          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              v-validate="'required'"
              placeholder="輸入姓名"
              :class="{'is-invalid':errors.has('name')}"
              v-model="form.user.name"
            />
            <span class="text-danger" v-if="errors.has('name')">必須輸入姓名</span>
          </div>
          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              placeholder="請輸入電話"
              v-model="form.user.tel"
            />
          </div>
          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="useraddress"
              placeholder="請輸入地址"
              v-model="form.user.address"
            />
            <span class="text-danger">地址欄位不得留空</span>
          </div>
          <div class="submit-wrap">
            <input type="submit" value="確認購買" />
          </div>
        </form>
      </div>
      <div class="basketList" v-if="cart.carts.length !==0">
        <h6>購買清單</h6>
        <table class="table table-sm">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>

              <td>
                {{item.product.title}}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td>{{item.qty}}</td>
              <td>{{item.final_total}}</td>
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
        <div class="input-group" v-if="cart.carts.length !==0">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
          </div>
        </div>
      </div>

      <div class="emptyCartText" v-if="cart.carts.length ==0">
        <router-link to="/" class="d-block btn btn-sm bg-danger text-light">購物車空了 返回商品列表</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      id: this.$route.params.id,
      products: [],
      product: {},
      cart: {},
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        }
      }
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
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(url, { data: order }).then(response => {
            console.log("訂單已建立", response);
            if (response.data.success) {
              vm.$router.push(`/customerpayment/${response.data.orderId}`);
            }
            vm.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log("欄位不完整");
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
.shippingDetail {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  display: flex;
  justify-content: center;

  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 15px;
  font-family: "	Helvetica-Light";
  letter-spacing: 2px;

  h5 {
    width: 100%;
    text-align: center;
    font-size: 22px;
    margin: 20px auto;
  }

  h6 {
    text-align: center;
    margin: auto;
    font-size: 20px;
    background: linear-gradient(left, #3cd3ad, #4cb8c4);
    padding: 3px;
  }

  .shipping {
    width: 60%;
    height: calc(100vh - 30%);
    margin-top: 1px;
  }
  .basketList {
    width: 30%;
    height: calc(100vh - 30%);
    border: 2px solid rgba(209, 208, 208, 0.3);
    border-radius: 5px;
    box-sizing: border-box;
    margin-left: 15px;
  }

  table {
    width: 100%;
    height: 100%;
    margin: auto;

    th,
    td {
      padding: 1rem 1rem;
    }
    th {
      text-align: center;
      // border-bottom: rgba(255, 255, 255, 0.3);
    }
    td[colspan="2"] + td {
      text-align: right;
    }
  }

  .submit-wrap {
    position: relative;
    clear: both;
    margin-top: 5rem;
    width: 100%;
    input[type="submit"] {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 50px;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      border-radius: 6px;
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      background: #f09819;
      transition: box-shadow 0.2s ease-in;
      &:hover {
        box-shadow: 0 10px 10px 1px rgba(0, 0, 0, 0.1);
        background: linear-gradient(left, #f09819, #3cd3ad);
        font-size: 1.3rem;
      }
    }
  }

  .emptyCartText {
    margin: 0 auto 0;
  }
}
</style>