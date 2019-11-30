<template>
  <div class="customerProduct">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent pl-0">
          <li class="breadcrumb-item" aria-current="page">
            <router-link to="/">首頁</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">全部產品</li>
        </ol>
      </nav>
    </div>
    <div class="container mb-5">
      <loading :active.sync="isLoading"></loading>
      <div class="row">
        <div class="col-md-5">
          <img class="w-100" :src="product.imageUrl" alt />
        </div>

        <div class="col-md-6">
          <h1 class="h2 mt-md-0 mt-3 text-md-left text-center">{{ product.title }}</h1>
          <hr />
          <div class="h5">
            <span class="badge badge-info">{{ product.category }}</span>
          </div>
          <p class="h6 my-3">{{ product.description }}</p>
          <p class="mb-5">{{ product.content }}</p>
          <hr />
          <div class="d-flex justify-content-between" v-if="product.price">
            <div class="h5" v-if="!product.price">售價 {{ product.origin_price | currency }}</div>
            <del class="h6 text-muted" v-if="product.price">原價 {{ product.origin_price | currency }}</del>
            <div class="h5 text-success" v-if="product.price">
              特價
              <b>{{ product.price | currency }}</b>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-6">
              <select class="form-control" name="qty" v-model="quantity">
                <option :value="num" v-for="num in 10" :key="num">選購{{num}}件</option>
              </select>
            </div>
            <div class="col-md-6 mt-md-0 mt-3">
              <button class="btn btn-primary btn-block" @click="addtoCart(product.id,product.num)">
                <i class="fas fa-spinner fa-spin" v-if="product.id===status.loadingItem"></i>加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <CustomerCart></CustomerCart>
    </div>
  </div>
</template>


<script>
import CustomerCart from "@/components/customer/customer_pages/customer_cart";
export default {
  components: {
    CustomerCart
  },

  data() {
    return {
      id: this.$route.params.id,
      product: {},
      quantity: 1,
      productId: "",
      isLoading: false,
      cart: {},
      status: {
        loadingItem: ""
      }
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
      this.isLoading = true;

      this.$http.get(api).then(response => {
        if (response.data.success === true) {
          vm.product = response.data.product;
          vm.status.loadingItem = "";
          vm.isLoading = false;
        }
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        console.log(response);
        vm.status.loadingItem = "";
        this.$bus.$emit("emitGetCart");
        this.$bus.$emit("message-push", response.data.message, "success");
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
    this.productId = this.$route.params.productId;
    this.getProduct();
    this.getCart();
  }
};
</script>
<style lang="scss" scoped>
.customerProduct {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

// .productDetail {
//   h5 {
//     font-size: 20px;
//   }
//   .productContent {
//     width: 100%;
//     border: 1px solid red;
//     box-shadow: 0px 0px 20px 2.5px rgba(85, 189, 91, 0.5);
//     margin: 40px 0 30px 0;
//     display: flex;
//     justify-content: space-around;

//     .productDescription {
//       width: 60%;
//       height: 300px;
//       border: 1px solid red;
//     }
//     .productCarousel {
//       width: 30%;
//       height: 300px;
//       border: 1px solid red;
//     }

//     h5 {
//       font-size: 30px;
//       color: black;
//     }
//   }
// }
</style>