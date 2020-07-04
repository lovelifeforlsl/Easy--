<template>
  <div>
    <div class="nav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr" @click="gohome">
        <span class="iconfont icon-1"></span>
      </div>
      <div class="middle">分类</div>
    </div>
    <div class="title">
      <van-tabs @click="onClick">
        <van-tab title="男生专区"></van-tab>
        <van-tab title="女生专区"></van-tab>
      </van-tabs>
    </div>
    <classlist :tipname="tip"></classlist>
  </div>
</template>

<style lang="less">
.nav{
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
import classlist from "../components/class/class"
export default {
  name: "classfiy",
  data() {
    return {
        tip:"男生专区"
    };
  },
 
  methods: {
    onClick(name, title) {
      this.tip = title;
    },
    goback(){
        this.$router.go(-1);
    },
    gohome(){
        this.$router.push({name:"home"})
    }
  },
  components: {
      classlist
  }
};
</script>