<template>
  <div>
    <div class="rankingnav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr" @click="gohome">
        <span class="iconfont icon-1"></span>
      </div>
      <div class="middle">排行榜</div>
    </div>
    <div class="title">
      <van-tabs @click="onClick">
        <van-tab title="男频"></van-tab>
        <van-tab title="女频"></van-tab>
        <van-tab title="出版"></van-tab>
      </van-tabs>
    </div>
    <ranklist :tipName="tip"></ranklist>
  </div>
</template>

<style lang="less">
.rankingnav {
  border-bottom: 1px solid #e8e8e8;
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
}
.title {
  font-size: 12px;
  color: #999;
  padding: 12px 0px;
  background-color: #f2f2f2;
  padding-top: 0;
  padding-bottom: 5px;
}
</style>
<script>
import ranklist from "../components/rank/rankpage";
export default {
  name: "classfiy",
  data() {
    return {
      tip: "男频"
    };
  },

  methods: {
    onClick(name, title) {
      this.tip = title;
    },
    goback() {
      this.$router.go(-1);
    },
    gohome() {
      this.$router.push({ name: "home" });
    }
  },
  components: {
    ranklist
  }
};
</script>