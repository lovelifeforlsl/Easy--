<template>
  <div class="ggpage">
    <!-- <div class="gg">
      <a href="#" class="logo">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <img src="../assets/images/logo-icon.jpg" alt />
      </a>
    </div> -->
    <div class="iviv">
      <img src="../assets/images/Guide_banner5.jpg" class="auto-img" alt />
      <van-loading color="#fff" size="40px" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 0,
      time: null
    };
  },
  beforeMount() {
    this.time = setInterval(() => {
      if (this.num == 3) {
        this.$router.push("/home");
      } else {
        this.num++;
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.time);
  }
};
</script>
<style lang="less" scoped>
.ggpage {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg.jpg");
  background-size:cover;
  .gg {
    width: 40%;
    position: absolute;
    left: 0;
    right: 0;
    top: 200;
    margin: auto;
    .logo {
      width: 100%;
      display: block;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        display: block;
      }
      span:nth-child(1) {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 4px;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);
        animation: animate1 1s linear infinite;
        //  animation-delay: 1s;
      }
      span:nth-child(2) {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 4px;
        height: 100%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
        animation: animate2 1s linear infinite;
        animation-delay: 0.5s;
      }
      span:nth-child(3) {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 4px;
        background: linear-gradient(to left, rgba(255, 255, 255, 0), #fff);
        animation: animate3 1s linear infinite;
        animation-delay: 1s;
      }
      span:nth-child(4) {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 4px;
        height: 100%;
        background: linear-gradient(to top, rgba(255, 255, 255, 0), #fff);
        animation: animate4 1s linear infinite;
        animation-delay: 1.5s;
      }
    }
  }
 
    .iviv {
      width: 100%;
      height: 100%;
      .van-loading {
        text-align: center;
        position: absolute;
        top: 50%;
        bottom: 0px;
        left: 0px;
        right: 0px;
        width: 100%;
      }
    }
  
}

@keyframes animate1 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes animate2 {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes animate3 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes animate4 {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>