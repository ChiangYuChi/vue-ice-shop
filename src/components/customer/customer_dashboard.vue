<!-- 共用模版 -->
<template>
  <div>
    <div class="main">
      <CustomerNavbar></CustomerNavbar>
      <router-view></router-view>
      <CustomerFooter></CustomerFooter>
    </div>
  </div>
</template>
<script>
import CustomerNavbar from "@/components/customer/customer_navbar";
import CustomerFooter from "@/components/customer/customer_footer";

export default {
  components: {
    CustomerNavbar,
    CustomerFooter
  }
};
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
