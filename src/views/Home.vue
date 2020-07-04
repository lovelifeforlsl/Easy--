<template>
  <div class="home">
    <div class="navbox" id="nav">
      <div class="logo clearfix">
        <span class="logoicon">
          <img src="../assets/images/logo.jpg" class="auto-img" alt />
        </span>
        <span class="logo-name">
          <img src="../assets/images/logo-name.png" class="auto-img" alt />
        </span>
      </div>
      <div class="items clearfix">
        <span @click="gomypage">
          <img class="auto-img" src="../assets/images/nabtouxiang.png" alt />
        </span>
        <span @click="gobookrack">
          <img class="auto-img" src="../assets/images/bookshelf_0322254.png" alt />
        </span>
        <span @click="gosearch">
          <img class="auto-img" src="../assets/images/search_4e18a23.png" alt />
        </span>
      </div>
    </div>
    <div class="grid">
      <ul class="clearfix">
        <li @click="routego('classify')">
          <div class="imgbox"></div>
          <p>分类</p>
        </li>
        <li @click="routego('rank')">
          <div class="imgbox p1"></div>
          <p>排行</p>
        </li>
        <li @click="routego('channel','女生专区')">
          <div class="imgbox p2"></div>
          <p>女频</p>
        </li>
        <li @click="routego('channel','男生专区')">
          <div class="imgbox p3"></div>
          <p>男频</p>
        </li>
        <li @click="routego('books')">
          <div class="imgbox p4"></div>
          <p>书单</p>
        </li>
      </ul>
    </div>
    <div class="info-block">最近阅读：乡野小渔民</div>
    <div class="scbanner">
      <van-swipe :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" class="auto-img"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- swiper 排版 -->
    <hotsearch :id="datainfo.data.male[1].major"></hotsearch>
    <!-- 横纵排列渲染 -->
    <dragon :id="datainfo.data.male[6].major"></dragon>
    <dragon :id="datainfo.data.male[7].major"></dragon>
    <dragon :id="datainfo.data.male[5].major"></dragon>
    <!-- 排行排版 -->
    <rank :id="datainfo.data.male[8].major"></rank>
    <rank :id="datainfo.data.male[4].major"></rank>
    <!-- 回到顶部 -->
    <div class="backtop">
      <a href="#nav" class="iconfont icon-huidaodingbu3 auto-img"></a>
    </div>
    <!-- copy-right -->
    <div class="bs-copyright">
      <a href="#" class="bs-button">下载小说客户端</a>
      <p class="bs-slogan">海量图书，更高品质阅读体验</p>
      <p>©免费小说网.1111com</p>
      <p>粤ICP备1111111号-1</p>
      <p>
        <span></span>
        <span>网络文化经营许可证：粤网文[2019]111-111号</span>
      </p>
      <p>增值电信业务经营许可证：粤B2-111111</p>
      <p>广州xxx文学信息技术有限公司 版权所有</p>
      <p>广州市天河区黄埔大道西平云路163号蓝翔技术专修学校</p>
      <p>0111-111111</p>
      <p></p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
  .backtop {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    z-index: 999;
    display: none;
    > .icon-huidaodingbu3 {
      font-size: 40px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      color: #00c98d;
      overflow: hidden;
      background-color: #fff;
    }
  }
}
.navbox {
  overflow: hidden;
  border-bottom: 1px solid #f3f3f3;
  .logo {
    height: 44px;
    line-height: 44px;
    float: left;
    overflow: hidden;
    .logoicon {
      display: inline-block;
      width: 25px;
      margin-right: 8px;
      margin-left: 16px;
    }
    .logo-name {
      display: inline-block;
      width: 72px;
      vertical-align: middle;
    }
  }
  .items {
    float: right;
    height: 44px;
    line-height: 44px;
    margin-right: 16px;
    > span {
      display: inline-block;
      width: 25px;
      vertical-align: middle;
    }
    > span:nth-of-type(2) {
      margin: 0px 16px;
    }
  }
}

.grid {
  border-bottom: 1px solid #f3f3f3;
  li {
    float: left;
    width: 20%;
    text-align: center;
    > .imgbox {
      width: 44px;
      height: 44px;
      margin: 15px auto 0px;
      background: url("../assets/images/2017022317384553.png") left top;
      background-size: 44px;
    }
    > p {
      margin: 10px 0px;
      color: #999;
    }
    .p1 {
      background-position: 0 -44px;
    }
    .p2 {
      background-position: 0 -88px;
    }
    .p3 {
      background-position: 0 -132px;
    }
    .p4 {
      background-position: 0 -176px;
    }
  }
}

.info-block {
  padding: 10px 20px;
  position: relative;
  line-height: 1.5;
  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border-right: 1px solid #000;
    border-top: 1px solid #000;
    transform: rotate(45deg);
    position: absolute;
    right: 20px;
    top: 15px;
  }
}

.scbanner{
  height: 202px;
  padding: 16px;
  overflow: hidden;
}

.bs-copyright {
  padding: 24px 16px;
  text-align: center;
  font-size: 12px;
  color: #999;
  .bs-button {
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background-color: #00c98d;
    border-radius: 3px;
    color: white;
  }
  .bs-slogan {
    margin-top: 10px;
    color: #333;
    font-size: 14px;
  }
  p {
    line-height: 1.8;
  }
}
</style>

<script>
import hotsearch from "../components/home/hotsearch";
import dragon from "../components/home/dragon";
import rank from "../components/home/rank";
export default {
  name: "home",
  data() {
    return {
      datainfo: {
        data: {
          male: [
            { major: "" },
            { major: "" },
            { major: "" },
            { major: "" },
            { major: "" },
            { major: "" },
            { major: "" },
            { major: "" },
            { major: "" },
            { major: "" },
            { major: "" },
            { major: "" }
          ]
        }
      },
      images: [
        require("../assets/images/banner1.jpg"),
        require("../assets/images/banner2.jpg"),
        require("../assets/images/banner3.jpg"),
        require("../assets/images/banner4.jpg"),
        require("../assets/images/banner5.jpg"),
        ]
    };
  },
  components: {
    hotsearch,
    dragon,
    rank
  },
  methods: {
    routego(routename, data) {
      // this.$router.push({name:routename})
      // if(data){
      this.$router.push({ name: routename, query: { queryname: data } });
      // }
    },
    gosearch() {
      this.$router.push({ name: "search" });
    },
    gobookrack() {
      this.$router.push({ name: "bookrack" });
    },
    gomypage() {
      this.$router.push({ name: "me" });
    }
  },
  created() {
    let self = this;
    this.$axios
      // 获取排行榜分类
      .get("/cats/lv2")
      .then(result => {
        console.log(result, "排行分类");
        self.datainfo = result;
      })
      .catch(err => {
        // console.log(err)
      });
  },
  mounted() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    var homeh = document.getElementsByClassName("home")[0];
    var backtop = document.getElementsByClassName("backtop")[0];
    homeh.style.height = h + "px";
    homeh.onscroll = function() {
      if (homeh.scrollTop < 500) {
        backtop.style.display = "none";
      } else {
        backtop.style.display = "block";
      }
    };
  }
};
</script>
