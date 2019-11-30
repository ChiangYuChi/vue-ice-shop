<template>
  <div>
    <Navbar />
    <AlertMessage></AlertMessage>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/backend/back_sidebar";
import Navbar from "@/components/backend/back_navbar";
import AlertMessage from "@/components/alert_message";

export default {
  components: {
    Sidebar,
    Navbar,
    AlertMessage
  }
};
</script>
