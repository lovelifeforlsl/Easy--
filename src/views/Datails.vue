<template>
  <div class="datails-box">
    <div class="nav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr" @click="gohome">
        <span class="iconfont icon-1"></span>
      </div>
      <div class="middle">书籍详情</div>
    </div>
    <!-- 详情-->
    <div class="cover-header">
      <coverheader></coverheader>
    </div>
    <div class="isolation"></div>
    <!-- 评论列表 -->
    <div class="comments-list">
      <commentslist></commentslist>
    </div>
    <div class="isolation"></div>
    <!-- 图书相关信息 -->
    <!-- <div>
      <coverabout></coverabout>
    </div>
    <div class="isolation"></div> -->
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
.datails-box {
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
  border-bottom: 1px solid #f0f0f0;
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
.title {
  font-size: 12px;
  color: #999;
  padding: 12px 0px;
  background-color: #f2f2f2;
  padding-top: 0;
  padding-bottom: 5px;
}
.isolation {
  height: 10px;
  background-color: #e8e8e8;
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
import coverheader from "../components/datails/coverheader";
import commentslist from "../components/datails/commentslist";
import coverabout from "../components/datails/coverabout";
export default {
  methods: {
    goback() {
      this.$router.go(-1);
    },
    gohome() {
      this.$router.push({ name: "home" });
    }
  },

  components: {
    coverheader,
    commentslist,
    // coverabout
  }
};
</script>