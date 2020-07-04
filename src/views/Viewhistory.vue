<template>
  <div class="history-box">
    <div class="historynav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr">
        <span class="iconfont icon-bianji7" v-show="!delflag" @click="delflag=!delflag"></span>
        <span class="iconfont icon-cuo3" v-show="delflag" @click="delflag=!delflag"></span>
      </div>
      <div class="middle">我的浏览</div>
    </div>
    <div class="histroylist clearfix">
      <div class="tips" v-show="tipsflag">当前还未浏览任何书籍,快去看书吧~</div>
      <div
        class="history-list-item"
        v-for="(item,index) in viewlist"
        :key="index"
        @click="gopage(item)"
      >
        <div class="history-cover">
          <img :src="'http://statics.zhuishushenqi.com'+item.cover" class="auto-img" alt />
        </div>
        <div class="history-info">
          <p class="viewuntil">观看至:</p>
          <p class="viewtitle">{{item.title}}</p>
        </div>
        <!-- 删除 -->
        <span class="iconfont icon-cuo5" v-show="delflag" @click.stop="delcollect(index)"></span>
      </div>
    </div>
    <div class="isolation"></div>
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

<script>
export default {
  data() {
    return {
      viewlist: [],
      // 删除按钮
      delflag: false,
      //   提示
      tipsflag: true,
      // 登录用户信息
      userinfo: {
        islogin: false,
        user: ""
      }
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    delcollect(index) {
      this.viewlist.splice(index, 1);

      if (this.viewlist == undefined) {
        this.tipsflag = true;
      }
      // 本地存储用户信息
      var user = JSON.parse(localStorage.getItem("user"));
      // 存储书籍信息
      user.forEach(ele => {
        if (ele.name == this.userinfo.user.name) {
          ele.viewlist = this.viewlist;
        }
      });
      localStorage.setItem("user", JSON.stringify(user));
    },
    gopage(item) {
      console.log(item.limit);
      console.log(item);
      this.$router.push({
        name: "page",
        query: { id: item.id, start: 0, index: item.limit }
      });
    }
  },
  mounted() {
    this.$toast.loading("加载中");
    // 获取用户登录信息
    var info = JSON.parse(sessionStorage.getItem("loginstatus"));
    if (info != null) {
      this.userinfo = info;
    }

    // 获取用户本地存储信息
    var user = JSON.parse(localStorage.getItem("user"));
    // 当前用户登录信息
    var userel = user.find(ele => {
      return ele.name == this.userinfo.user.name;
    });
    console.log(user);
    this.viewlist = userel.viewlist;
    if (this.viewlist == undefined) {
      // console.log("您还未收藏任何书籍");
      this.tipsflag = true;
    } else {
      this.tipsflag = false;
    }
    this.$toast.clear();
  }
};
</script>

<style lang="less">
.history-box {
  padding-top: 45px;
}
.historynav {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 44px;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.8);
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

.histroylist {
  padding: 20px 0px 20px 20px;
  .tips {
    height: 100px;
    line-height: 100px;
    font-size: 16px;
    color: #333;
    text-align: center;
  }
}
.history-list-item {
  margin-top: 20px;
  float: left;
  width: 33.33%;
  padding-right: 20px;
  box-sizing: border-box;
  position: relative;
  .history-cover {
    height: 140px;
    > img {
      height: 100%;
    }
  }
  .history-info {
    text-align: center;
    font-size: 12px;
    .viewuntil {
      font-size: 14px;
      text-align: center;
      margin: 6px 0px;
      font-weight: 600;
      color: #ed1c24;
    }
    .viewtitle {
      height: 32px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .icon-cuo5 {
    position: absolute;
    color: #ed1c24;
    top: -10px;
    right: 10px;
    font-size: 24px;
  }
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