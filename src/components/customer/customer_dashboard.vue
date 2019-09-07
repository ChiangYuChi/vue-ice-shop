<!-- 共用模版 -->
<template>
  <div>
    <CustomerNavbar></CustomerNavbar>
    <div class="main">
      <router-view></router-view>
    </div>

    <CustomerFooter></CustomerFooter>
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
main {
  width: 100%;
}
</style>
