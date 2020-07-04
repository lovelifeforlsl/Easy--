<template>
  <div>
    <div class="soucetitle">
      更多书籍源
      <span v-show="showflag" class="iconfont icon-tubiaozhizuo-" @click="spread"></span>
      <span v-show="!showflag" class="iconfont icon-arrow-up" @click="spread"></span>
    </div>
    <div class="souceitem">
      <div class="linksouce" v-for="(item,index) in relatedata.data" :key="index">
        <div>
          <a class="soucename" :href="`/toc/`+item.link">{{item.name}}</a>
          <span class="soucetime">{{item.updated | Form}}</span>
        </div>
        <p>{{item.lastChapter}}</p>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.soucetitle {
  margin: 16px 0px;
  padding: 0px 16px;
  font-size: 14px;
  color: #333;
  border-left: 2px solid #00c98d;
  position: relative;
  .icon-tubiaozhizuo-,
  .icon-arrow-up {
    position: absolute;
    bottom: 0px;
    right: 0px;
    line-height: 20px;
    background-color: #fff;
    opacity: 0.8;
    padding-right: 20px;
    text-align: center;
    font-size: 20px;
  }
}
.souceitem {
  display: none;
}

.linksouce {
  background-color: #f5f5f5;
  border-bottom: 1px solid #f0f0f0;
  height: 50px;
  line-height: 24px;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
  .soucename {
    color: #00c98d;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 600;
    overflow: hidden;
  }
  .soucetime {
    float: right;
  }
}
</style>

<script>
export default {
  data() {
    return {
      relatedata: { data: [] },
      showflag: true
    };
  },
  filters: {
    Form: function(val) {
      return val
        .split(".")[0]
        .replace(/-/g, "/")
        .replace(/T/g, " ");
    }
  },
  methods: {
    spread() {
      var ele = document.getElementsByClassName("souceitem")[0];
      this.showflag = !this.showflag;
      if (!this.showflag) {
        ele.style.display = "block";
      } else {
        ele.style.display = "none";
      }
    }
  },
  mounted() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    var id = this.$route.query.id;
    this.$axios({
      method: "GET",
      url: "/book/" + id
    }).then(result => {
      this.relatedata = result;
    });
  }
};
</script>