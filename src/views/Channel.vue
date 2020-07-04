<template>
  <div class="channel-box">
    <div class="nav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr" @click="gohome">
        <span class="iconfont icon-1"></span>
      </div>
      <div class="middle">{{name}}</div>
    </div>
    <!-- swiper 排版 -->
    <hotsearch :id="channelsex=='female'? datainfo.data.female[1].major: datainfo.data.male[1].major" :sex="channelsex"></hotsearch>
    <!-- 横纵排列渲染 -->
    <dragon :id="channelsex=='female'? datainfo.data.female[2].major : datainfo.data.male[2].major" :sex="channelsex"></dragon>
    <dragon :id="channelsex=='female'? datainfo.data.female[9].major : datainfo.data.male[3].major" :sex="channelsex"></dragon>
    <dragon :id="channelsex=='female'? datainfo.data.female[4].major : datainfo.data.male[4].major" :sex="channelsex"></dragon>
    <!-- 排行排版 -->
    <rank :id="channelsex=='female'? datainfo.data.female[5].major :  datainfo.data.male[5].major" :sex="channelsex"></rank>
    <rank :id="channelsex=='female'? datainfo.data.female[6].major : datainfo.data.male[6].major" :sex="channelsex"></rank>
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

<style lang="less">
.channel-box{
  padding-top: 44px;
}
.nav {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 44px;
  background-color: #fff;
  z-index: 999;
  border-bottom: 1px solid #e8e8e8;
}
.lefticon,
.righticon {
  width: 54px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  .iconfont {
    color: #2ad29f;
    font-size: 22px;
  }
}
.middle {
  overflow: hidden;
  width: auto;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: #333;
  font-size: 16px;
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
import hotsearch from "../components/channel/hotsearch";
import dragon from "../components/channel/dragon";
import rank from "../components/channel/rank";
export default {
  data() {
    return {
      datainfo: {
        data: {
          female: [
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
          ],
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
          ],
        }
      },
      name:"男生专区",
      channelsex:'female'
    };
  },
  components: {
    hotsearch,
    dragon,
    rank
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    gohome() {
      this.$router.push({ name: "home" });
    }
  },
  created() {
     let queryname = this.$route.query.queryname;
    this.name = queryname;
    if(queryname=='女生专区'){
        this.channelsex = "female"
    }else if(queryname == '男生专区'){
        this.channelsex = "male"
    }

    let self = this;
    this.$axios
      // 获取排行榜分类
      .get("/cats/lv2")
      .then(result => {
        self.datainfo = result;
      })
      .catch(err => {
      });
    
  },mounted() {
    this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
  },
};
</script>