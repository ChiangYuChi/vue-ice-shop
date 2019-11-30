<template>
  <div class="nav-wrapper">
    <nav class="navbar navbar-expand-lg navbar-light px-0">
      <div class="logo">
        <a class="nav-link" href="#">
          <router-link to="/">麥好冰</router-link>
        </a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <router-link to="/">
                <i class="fas fa-box-open"></i>
                首頁
              </router-link>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <router-link to="/customercoupon">
                <i class="fas fa-ticket-alt"></i>
                優惠活動
              </router-link>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <router-link to="/customerorder">
                <i class="fas fa-coins"></i>訂單
              </router-link>
            </a>
          </li>
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <router-link to="/login">
                <i class="fas fa-cog"></i>
              </router-link>
            </a>
          </li>-->
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: rgb(255, 244, 216);
  font-family: "MStiffHeiHK";
  display: flex;
  justify-content: space-between;

  .logo {
    margin-left: 5%;
    font-size: 55px;
    font-weight: bold;
    font-style: italic;
    letter-spacing: 20px;
    color: rgb(211, 151, 59);
    a {
      text-decoration: none;
    }
  }

  #navbarNav {
    font-size: 20px;

    .navbar-nav {
      display: flex;
      justify-content: flex-end;
      right: 5%;
      width: 95%;

      .nav-item {
        padding: 0 15px;
        box-sizing: border-box;
        text-align: center;

        a {
          text-decoration: none;
          color: rgb(211, 151, 59);
          border: 20px solid transparent;
          background-clip: padding-box;

          &:hover {
            color: #3e5214;
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .logo {
      margin: 0 auto;
    }
  }
}
</style>
