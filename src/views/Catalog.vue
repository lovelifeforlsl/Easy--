<template>
  <div class="catalog">
    <div class="catalog-nav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr" @click="gohome">
        <span class="iconfont icon-1"></span>
      </div>
      <div class="middle">{{title}}</div>
    </div>
    <div class="catalog-range">
      <div class="left-catalog" @click="showprop">
        <span>{{start+1}}~{{limit+1}}</span>
        <span class="iconfont icon-shujia"></span>
      </div>
      <div class="right-catalog">
        <span v-show="showflag" class="iconfont icon-zhengxu" @click="ranklist"></span>
        <span v-show="!showflag" class="iconfont icon-zhengxu1" @click="ranklist"></span>
      </div>
    </div>
    <div class="catalog-box">
      <ul>
        <li v-for="(item,index) in chapterslist" :key="index" @click="gopage(start,index,id,title)">{{item.title}}</li>
      </ul>
    </div>
    <!-- 遮罩层 -->
    <div class="popup" v-show="show" @click="hideprop">
      <div class="listbox">
        <div
          class="listpart"
          v-for="i in Math.floor(total/100)+1"
          :key="i"
          @click="changepage(i)"
        >{{(i-1)*100 + 1}}~{{(i)*100}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.catalog-nav {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 44px;
  background-color: #fff;
  z-index: 999;
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
.catalog-range {
  position: fixed;
  top: 45px;
  left: 0px;
  height: 39px;
  line-height: 39px;
  text-align: center;
  width: 100%;
  padding: 0px 16px;
  font-size: 16px;
  border-bottom: 1px solid #e8e8e8;
  .left-catalog {
    float: left;
    width: 20%;
    height: 100%;
    .icon-shujia {
      margin-left: 5px;
    }
  }
  .right-catalog {
    overflow: hidden;
    width: auto;
    height: 100%;
    text-align: right;
    padding-right: 40px;
  }
}
.catalog-box {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 85px;
  bottom: 0px;
  overflow-y: scroll;
  padding-left: 32px;
  > ul li {
    font-size: 14px;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid #e8e8e8;
  }
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  .listbox {
    width: 60%;
    height: 50%;
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    overflow-y: scroll;
    .listpart {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      id: "",
      //   遮罩层
      show: false,
      chapterslist: [],
      start: 0,
      limit: 99,
      total: 0,
      //   排序
      showflag: true,
      title:"",
    };
  },

  watch: {
    chapterslist: function(newval) {
      this.chapterslist = newval;
    }
  },
  methods: {
    axios() {
      this.id = this.$route.query.id;
      this.title = this.$route.query.title;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      // 获取书籍的所有目录
      this.$axios({
        method: "GET",
        url: `/toc/mix?bookId=` + this.id
      }).then(result => {
        this.$toast.clear();
        this.chapterslist = result.data.chapters.slice(this.start, this.limit);
        this.total = result.data.chapters.length;
      });
    },
    goback() {
      this.$router.go(-1);
    },
    gohome() {
      this.$router.push({ name: "home" });
    },
    changepage(i) {
      this.start = (i - 1)*100;
      this.limit = i * 100 - 1;
      this.id = this.$route.query.id;
      this.axios();
    },
    ranklist() {
      this.showflag = !this.showflag;
      this.chapterslist = this.chapterslist.reverse();
    },
    showprop() {
      this.show = true;
    },
    hideprop() {
      this.show = false;
    },
    gopage(start,index,id,title){
      // 文章索引值  start:开始的页数   index:索引值   id:书籍id
      this.$router.push({name:"page",query:{start:start,index:index,id:this.id,title:this.title}})
      // console.log(start,"start")
      // console.log(index,'index')
      // console.log(id,'id')
    }
  },
  mounted() {
    this.axios();
  }
};
</script>