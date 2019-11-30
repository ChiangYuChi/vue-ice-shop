<template>
  <div>
    <div class="my-3 paymentDetail">
      <h5>結帳確認</h5>
      <div class="my-3 row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
          <div class="baskerList">
            <h6>購買清單</h6>
            <table class="table">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">{{ order.total }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="shipping">
            <h6>付款人資訊</h6>
            <table class="table">
              <tbody>
                <tr>
                  <th width="100">信箱</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger">確認付款去</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: {
        user: {}
      },
      orderId: ""
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.order = response.data.order;
        console.log(response);
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then(response => {
        console.log(response);
        if (response.data.success) {
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    console.log(this.orderId);
  }
};
</script>
<style lang="scss" scoped>
.paymentDetail {
  .table {
    border: 2px solid rgba(209, 208, 208, 0.3);
  }
  h5 {
    width: 100%;
    text-align: center;
    font-size: 22px;
    margin: 10px auto;
    font-weight: bold;
  }
  h6 {
    text-align: center;
    margin: auto;
    font-size: 20px;
    background: linear-gradient(left, #3cd3ad, #4cb8c4);
    padding: 3px;
  }
}
</style>