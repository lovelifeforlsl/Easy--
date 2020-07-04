<template>
  <div>
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <!-- page1 -->
        <div class="swiper-slide" ref="liheight">
          <img  src="../assets/images/Guide_banner1.jpg" alt />
          <span class="icon">
            <img class="animated slideOutUp infinite" src="..\assets\images\page1.icon.png" alt v-show="flag"/>
          </span>
        </div>
         <!-- page2 -->
        <div class="swiper-slide" ref="liheight">
          <img  src="../assets/images/Guide_banner2.jpg" alt />
          <span class="icon">
            <img class="animated slideOutUp infinite" src="..\assets\images\page1.icon.png" alt v-show="flag"/>
          </span>
        </div>
         <!-- page3 -->
        <div class="swiper-slide" ref="liheight">
          <img  src="../assets/images/Guide_banner3.jpg" alt />
          <span class="icon">
            <img class="animated slideOutUp infinite" src="..\assets\images\page1.icon.png" alt v-show="flag"/>
          </span>
        </div>
         <!-- page4 -->
        <div class="swiper-slide" ref="liheight">
          <img  src="../assets/images/Guide_banner4.jpg" alt />
          <a href="#" @click="go">
            <img class="more" src="../assets/images/login_icon.png" alt />
          </a>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/dist/js/swiper.min";
export default {
  data() {
    return {
      flag: true
    };
  },
  methods: {
    go() {
      this.$router.push("/gg");
    }
  },
  created() {
    if (localStorage.one) {
      this.$router.push("/gg");
    } else {
      localStorage.one = true;
    }
  },
  mounted() {
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.$refs.liheight.style.height = h + "px";

    let _this = this;

    new Swiper(".swiper-container", {
      direction: "vertical",
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      on: {
        slideChangeTransitionStart: function() {
          _this.flag = false;
        },
        slideChangeTransitionEnd: function() {
          _this.flag = true;
          // alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
html,
body {
  position: relative;
  height: 100%;
}
body {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-container{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
  .swiper-slide{
    width: 100%;
    position: relative;
    img{
      width: 100%;
      display: block;
    }
    .icon {
    display: block;
    width: 40px;
    position: absolute;
    bottom: 40px;
    left: 0px;
    right: 0px;
    margin: auto;
    z-index: 10000;
    img {
      display: block;
      width: 100%;
    }
   }
    .more{
      display: block;
      position: absolute;
      width: 60%;
      left: 0;
      right: 0;
      bottom: 0px;
      margin: auto;
      &:hover{
          cursor: pointer;
      }
    }
  }
}
</style>