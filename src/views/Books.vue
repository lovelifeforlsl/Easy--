<template>
  <div>
    <div class="nav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr" @click="gohome">
        <span class="iconfont icon-1"></span>
      </div>
      <div class="middle">书单</div>
    </div>
    <div><booklist></booklist></div>
    <!-- copy-right -->
    <!-- <div class="bs-copyright">
      <a href="#" class="bs-button">下载书旗小说客户端</a>
      <p class="bs-slogan">海量图书，更高品质阅读体验</p>
      <p>©2016书旗网shuqi.com</p>
      <p>粤ICP备13078413号-1</p>
      <p>
        <span></span>
        <span>网络文化经营许可证：粤网文[2017]3018-499号</span>
      </p>
      <p>增值电信业务经营许可证：粤B2-20130742</p>
      <p>广州阿里巴巴文学信息技术有限公司 版权所有</p>
      <p>广州市天河区黄埔大道西平云路163号广电平云广场B塔13层自编03单元</p>
      <p>0571-26883636</p>
    </div> -->
  </div>
</template>

<style lang="less">
.nav {
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
import booklist from '../components/books/booklist' 
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
      booklist
  }
};
</script>