<template>
  <div class="footer">
    <div class="logo">
      <h4>麥好冰</h4>
      <p>堅持選用真材實料的水果製作 找回最初的感動堅持選用真材實料的水果製作 找回最初的感動堅持選用真材實料的水果製作 找回最初的感動</p>
    </div>
    <div class="contact">
      <h4>Contact Us</h4>
      <p>
        Tel: 0935678900
        <br />Address: 全家就是你家
        <br />Mail: didadida@gmail.com
      </p>
    </div>
    <div class="socialIcon">
      <h4>Follow Us</h4>
      <div class="icons">
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-instagram"></i>
        <i class="fas fa-home"></i>
      </div>
      <p></p>
      <p></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 220px;
  background-color: rgb(163, 171, 87);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-family: "MStiffHeiHK";
  font-weight: bold;
  color: #fff6e0;
  bottom: 0%;
  h4 {
    font-size: 30px;
  }

  .logo {
    width: 25%;
    height: 150px;

    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    text-align: center;
    p {
      width: 80%;
    }
  }

  .contact {
    width: 25%;
    height: 150px;

    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    text-align: center;
    p {
      width: 80%;
    }
  }

  .socialIcon {
    width: 25%;
    height: 150px;

    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    top: 5px;

    .icons {
      display: flex;
      justify-content: space-evenly;
      width: 100%;

      .fa-facebook-f,
      .fa-instagram,
      .fa-home {
        font-size: 25px;
      }
    }
  }
}

@media (max-width: 768px) {
  .footer {
    display: flex;
    flex-direction: row;
    font-family: "Helvetica, sans-serif";

    h4 {
      font-size: 25px;
    }

    .logo {
      display: none;
    }

    .contact {
      width: 50%;
    }

    .socialIcon {
      width: 50%;

      .icons {
        display: flex;
        justify-content: space-evenly;
        width: 100%;

        .fa-facebook-f,
        .fa-instagram,
        .fa-home {
          font-size: 25px;
        }
      }
    }

    p {
      font-size: 15px;
    }
  }
}

@media (max-width: 414px) {
  .footer {
    display: flex;
    flex-direction: row;
    font-family: "Helvetica, sans-serif";

    h4 {
      font-size: 20px;
    }

    .logo {
      display: none;
    }

    .contact {
      width: 50%;
    }

    .socialIcon {
      width: 50%;

      .icons {
        display: flex;
        justify-content: space-evenly;
        width: 100%;

        .fa-facebook-f,
        .fa-instagram,
        .fa-home {
          font-size: 20px;
        }
      }
    }

    p {
      font-size: 13px;
    }
  }
}
</style>