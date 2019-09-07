<template>
  <div class="col-md-3">
    <div class="mobile_scroll">
      <div class="menu">
        <ul class="list-group">
          <li class="list-group-content">
            <a
              href="#"
              class="list-group-item"
              @click.prevent="toCategoryPage('',1)"
              :class="{'active':isActive==1}"
              title="所有商品"
            >
              <div class="list-group-description">
                <div class="cn">
                  <span>所</span>
                  <span>有</span>
                  <span>商</span>
                  <span>品</span>
                </div>
                <div class="en">
                  <span>All Products</span>
                </div>
              </div>
            </a>
          </li>
          <li class="list-group-content">
            <a
              href="#"
              class="list-group-item"
              @click.prevent="toCategoryPage('冰淇淋蛋糕',2)"
              :class="{'active':isActive==2}"
            >
              <div class="list-group-description">
                <div class="cn">
                  <span>冰</span>
                  <span>淇</span>
                  <span>淋</span>
                  <span>蛋</span>
                  <span>糕</span>
                </div>
                <div class="en">
                  <span>Ice Cream Cake</span>
                </div>
              </div>
            </a>
          </li>
          <li class="list-group-content">
            <a
              href="#"
              class="list-group-item"
              @click.prevent="toCategoryPage('冰淇淋',3)"
              :class="{'active':isActive==3}"
            >
              <div class="list-group-description">
                <div class="cn">
                  <span>冰</span>
                  <span>淇</span>
                  <span>淋</span>
                </div>
                <div class="en">
                  <span>Ice Cream</span>
                </div>
              </div>
            </a>
          </li>

          <li class="list-group-content">
            <a
              href="#"
              class="list-group-item list-group-item-light"
              @click.prevent="toCategoryPage('冰棒',4)"
              :class="{'active':isActive==4}"
            >
              <div class="list-group-description">
                <div class="cn">
                  <span>冰</span>
                  <span>棒</span>
                </div>
                <div class="en">
                  <span>Fruit Ice Pop</span>
                </div>
              </div>
            </a>
          </li>

          <li class="list-group-content">
            <a
              href="#"
              class="list-group-item"
              @click.prevent="toCategoryPage('季末出清',5)"
              :class="{'active':isActive==5}"
            >
              <div class="list-group-description">
                <div class="cn">
                  <span>季</span>
                  <span>末</span>
                  <span>出</span>
                  <span>清</span>
                </div>
                <div class="en">
                  <span>On Sales</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      isActive: 1
    };
  },
  methods: {
    toCategoryPage(category, n) {
      this.isActive = n;
      this.$bus.$emit("category-search", category);
    }
  }
};
</script>


<style lang="scss" scoped>
.mobile_scroll {
  width: 250px;
  margin-top: 20px;
  margin-left: 10%;
}
.menu {
  width: 100%;
  position: relative;
  height: 1009px;
  font-family: "Helvetica";

  .list-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    width: 100%;

    list-style-type: none;

    .list-group-content {
      width: 20%;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
      position: relative;

      font-size: 20px;

      .list-group-item {
        width: 50%;
        height: 505px;
        background-color: rgb(255, 244, 216);
        color: #656565;
        text-decoration: none;
        display: flex;
        align-items: center;
        flex-direction: column;
        border: none;
        font-size: 20px;
      }

      .list-group-item:hover {
        background-color: rgb(238, 209, 157);
        opacity: 0.8;
        color: #f7f7f7;
        transition: 0.6s;
        border-radius: 20px;
      }
      .active {
        color: white;
        background-color: rgb(143, 159, 56);
        opacity: 0.8;
        border-radius: 20px;
      }

      .list-group-description {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
      }

      .cn {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .en {
        writing-mode: vertical-lr;
      }
    }
  }
}

@media (max-width: 768px) {
  .mobile_scroll {
    width: 700px;
    margin: 10px auto;
  }

  .menu {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .list-group {
      .list-group-content {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        font-size: 20px;

        .list-group-item {
          width: 100%;
          height: 65px;
        }

        .list-group-description {
          height: 50%;
        }

        .cn {
          display: flex;
          flex-direction: row;
        }

        .en {
          writing-mode: horizontal-tb;
          font-size: 10px;
        }
      }
    }
  }
}

@media (max-width: 414px) {
  .mobile_scroll {
    width: 380px;

    margin: 10px auto;
  }
  .menu {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .list-group {
      display: flex;
      justify-content: space-between;

      .list-group-content {
        width: 19%;
        display: flex;

        flex-direction: column;
        align-items: center;
        position: relative;

        .list-group-item {
          width: 100%;
          height: 35px;
          display: flex;
          justify-content: center;
          padding-bottom: 35px;
        }
        .list-group-item:hover {
          border-radius: 3px;
        }

        .active {
          border-radius: 3px;
        }

        .list-group-description {
          height: 50%;
        }

        .cn {
          display: flex;
          flex-direction: row;
          font-size: 13px;
        }

        .en {
          display: none;
        }
      }
    }
  }
}
</style>