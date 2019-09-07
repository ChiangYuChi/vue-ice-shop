<!-- 首頁 -->
<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <CustomerBanner></CustomerBanner>

    <div class="mainIndex">
      <Sidebar></Sidebar>
      <div class="mainContent">
        <div class="aboutUs">
          <h2>關於麥好冰</h2>
          <div class="descripton">
            <p>麥好冰成立於2019，是為了消費者的食品安全及友善農業而誕生的品牌。</p>
            <p>購買與食用新鮮、在地、當季的台灣水果及生鮮蔬果與作物，對環境環保，對人體養身。過早或過晚出現在市場的生鮮蔬果都不適宜人們食用。台灣水果成長於適當的氣候土壤，吸飽天地精華</p>

            <p>麥好冰的創辦人麥好多出生於風光明媚的東海岸，深愛家鄉豐饒的土地上生產的甜美水果。為了使農民的經濟、就業更獲得保障，也為了替消費者嚴格把關，因此把友善耕作納入管理，堅持使用100%台灣新鮮水果、手作無添加高品質冰棒。愛護農民並關懷消費者權益。</p>
          </div>
        </div>

        <h3>
          來喫冰
          <span>Online Shop</span>
        </h3>

        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="cardContent mt-3">
                <div class="col-md-6 col-lg-4 mb-4" v-for="item in filterdProducts" :key="item.id">
                  <div class="card border-0 shadow-sm card-outer">
                    <div
                      class="cover-box"
                      style="height: 150px; background-size: cover; background-position: center"
                      :style="{backgroundImage:`url(${item.imageUrl})`}"
                    ></div>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                      <h5 class="card-title font-weight-normal">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <hr />
                      <p class="card-text text-dark">{{ item.content }}</p>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5 ml-auto" v-if="!item.price">{{ item.origin_price }} 元</div>
                        <del
                          class="h6 font-weight-normal text-dark"
                          v-if="item.price"
                        >原價 {{ item.origin_price }} 元</del>
                        <div class="h5 text-dark" v-if="item.price">
                          <span class="text-info">特價{{item.price| currency}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <button
                        type="button"
                        class="btn btn-outline-secondary btn-sm"
                        @click="getProduct(item.id)"
                      >查看更多</button>

                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm ml-auto"
                        @click.prevent="addtoCart(item.id)"
                      >
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomerCart></CustomerCart>
    </div>

    <!-- <div class="changePagination">
      <pagination
        v-if="pageMode"
        :pagination="pagination"
        @pageTrigger="getProducts"
        class="pagination"
      ></pagination>
    </div>-->
  </div>
</template>


<script>
import Sidebar from "@/components/customer/customer_sidebar";
import pagination from "@/components/pagination";
import CustomerCart from "@/components/customer/customer_pages/customer_cart";
import CustomerBanner from "@/components/customer/customer_banner";

import $ from "jquery";

export default {
  components: {
    Sidebar,
    pagination,
    CustomerCart,
    CustomerBanner
  },

  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      pagination: {},
      filter: "",
      category: "",
      allProducts: [],
      newArr: [],
      // pageMode: false,
      status: {
        loadingItem: ""
      }
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.isLoadings = true;
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      this.$router.push(`/customerproducts/${id}`);
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
        vm.cart = response.data.data;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getAll() {
      const api_all = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(api_all).then(response => {
        this.allProducts = response.data.products;
      });
    },

    filterSearch(filter) {
      this.filter = filter;
    },
    categorySearch(category) {
      // this.needPage = false;
      if (category != "") {
        this.category = category;
        // this.pageMode = false;
        this.newArr = this.allProducts.filter(item => {
          return item.category == category;
        });
      } else {
        this.category = category;
        this.newArr = this.allProducts;
      }
    }
  },
  computed: {
    filterdProducts: {
      get() {
        if ((this.filter.trim() == "") & (this.category == "")) {
          return this.allProducts;
        } else if ((this.filter.trim() == "") & (this.category != "")) {
          return this.newArr;
        } else if ((this.filter.trim() != "") & (this.category == "")) {
          return this.allProducts.filter(item => {
            return item.title.indexOf(this.filter) > -1;
          });
        } else {
          return this.newArr.filter(item => {
            return item.title.indexOf(this.filter) > -1;
          });
        }
      },
      set(value) {}
    }
  },

  created() {
    this.getAll();
    this.$bus.$on("filter-search", this.filterSearch);
    this.$bus.$on("category-search", this.categorySearch);
    this.getCart();
  },
  // updated() {
  //   if (this.filter != "") {
  //     this.pageMode = false;
  //   }
  // },
  beforeDestroy() {
    this.$bus.$off("filter-search", this.filterSearch);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/all.scss";

.mainIndex {
  background-color: rgb(255, 244, 216);
  width: 100%;
  display: flex;
  justify-content: center;

  .mainContent {
    max-width: 80%;
    margin-top: 20px;
  }

  .aboutUs {
    max-width: 90%;
    height: 449px;
    margin: 20px 0px 10px 30px;
    background-color: #f1d971;

    h2 {
      font-size: 80px;
      font-family: "TaipeiSansTCBeta-Light";
      font-weight: bold;
      color: #fff6e0;
      width: 50%;
      margin: 0 0 40px 20px;
    }

    .descripton {
      width: 90%;
      margin-left: 20px;

      p {
        font-size: 18px;
        line-height: 36px;
        color: #656565;
        text-align: justify;
      }
    }
  }

  h3 {
    width: 90%;
    margin-left: 3%;
    color: #5c7d16;
    border-bottom: 1px solid #a0ac48;
    padding: 5px;
    position: relative;

    span {
      color: #a0ac48;
      font-size: 19px;
      position: absolute;
      bottom: -25px;
      left: 5px;

      line-height: 20px;
    }
  }
  .row {
    width: 90%;
    margin-top: 20px;

    .cardContent {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      width: 100%;
      margin: 0 auto;
    }
    .card-title {
      font-size: 22px;

      a {
        text-decoration: none;
      }
    }

    .cover-box {
      border-radius: 30px 30px 0 0;
    }

    .card-footer {
      border-radius: 0 0 30px 30px;
    }

    .card-outer {
      border-radius: 30px;
    }
  }
}

@media (max-width: 768px) {
  .mainIndex {
    display: flex;
    flex-direction: column;

    .aboutUs {
      display: none;
    }

    h3 {
      margin-left: 8%;
    }
    .container {
      margin-left: 10%;
      display: flex;
      justify-content: center;
    }
  }
}

// .changePagination {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 15px;
// }
</style>