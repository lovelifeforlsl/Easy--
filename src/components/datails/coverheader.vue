<template>
  <div>
    <div class="headerbox">
      <div class="headimg">
        <img :src="'http://statics.zhuishushenqi.com'+infodata.data.cover" class="auto-img" alt />
      </div>
      <div class="headerinfo">
        <div class="headertitle">{{infodata.data.title}}</div>
        <div>{{infodata.data.author}}</div>
        <div class="headertype">
          <span class="magt">{{infodata.data.minorCate}}</span>
          <span class="magt">{{infodata.data.wordCount | halo}}万字</span>
          <span>{{infodata.data.totalFollower}}人关注</span>
        </div>
        <div>
          <span>最近更新 : {{infodata.data.updated.split("T")[0]}}</span>
        </div>
      </div>
    </div>
    <!-- 按钮组 -->
    <div class="coverbutton">
      <van-button type="primary" @click="gopage(infodata.data._id)">开始阅读</van-button>
      <van-button plain type="primary">离线下载</van-button>
      <van-button type="primary" v-show="flag" @click="bookrank(infodata.data)">收藏</van-button>
      <van-button :disabled="!flag" v-show="!flag" type="primary">已收藏</van-button>
    </div>
    <!-- 文本 -->
    <div class="coverdesc">
      <p v-for="(text,textind) in infodata.data.longIntro" :key="textind">{{text}}</p>
    
      <span
        v-show="showflag"
        class="iconfont icon-chakangengduo4" @click="spread"
      ></span>
      <span v-show="!showflag" class="iconfont icon-packup-fill" @click="spread"></span>
    </div>
    <!-- 章节 -->
    <div class="chapter" @click="newpage(infodata.data._id)">
      <span class="iconfont icon-shijian"></span>
      <span class="chapertitle">最新</span>
      <span class="chaperdesc">{{infodata.data.lastChapter}}</span>
      <span class="iconfont icon-youjiantou"></span>
    </div>
    <div class="chapter" @click="gocatalog(infodata.data._id,infodata.data.title)">
      <span class="iconfont icon-fenlei"></span>
      <span class="chapertitle">目录</span>
      <span class="chaperdesc">{{infodata.data.safelevel}}小时前更新</span>
      <span class="iconfont icon-youjiantou"></span>
    </div>
  </div>
</template>

<style lang="less">
.headerbox {
  padding: 16px;
  overflow: hidden;
  .headimg {
    width: 90px;
    float: left;
    margin-right: 16px;
    > img {
      height: 120px;
    }
  }
  .headerinfo {
    overflow: hidden;
    width: auto;
    font-size: 14px;
    color: #999;
    .headertitle {
      font-size: 18px;
      color: #333;
      font-weight: 600;
      margin: 10px 0px;
    }
    .headertype {
      margin: 10px 0px;
      .magt {
        margin-right: 16px;
      }
    }
  }
}
.coverbutton {
  margin-left: 16px;
  box-sizing: border-box;
  .van-button {
    width: calc(33.33% - 16px);
    margin-right: 16px;
    height: 41px;
  }
}
.coverdesc {
  padding: 18px;
  margin-bottom: 10px;
  font-size: 14px;
  text-indent: 16px;
  color: #999;
  line-height: 1.5;
  height: 60px;
  // display: -webkit-box;
  // -webkit-line-clamp: 3;
  // -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
 
  .icon-chakangengduo4
,.icon-packup-fill{
    position: absolute;
    bottom: -5px;
    left: 0px;
    right: 0px;
    margin: auto;
    height: 20px;
    line-height: 20px;
    background-color: #fff;
    color: #07C160;
    padding-right: 20px;
    text-align: center;
    font-size: 12px;
  }
}
.chapter {
  margin: 0px 16px;
  height: 54px;
  line-height: 54px;
  font-size: 14px;
  color: #999;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  > .icon-shijian {
    float: left;
    font-size: 24px;
    vertical-align: middle;
  }
  .chapertitle {
    float: left;
    font-size: 16px;
    color: #333;
    margin: 0px 16px;
  }
  .icon-youjiantou {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 16px;
  }
  .chaperdesc {
    width: 210px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .icon-fenlei {
    float: left;
    font-size: 16px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      infodata: { data: { cover: {}, updated: "" } },
      showflag: true,

      // 登录用户信息
      userinfo: {
        islogin: false,
        user: ""
      },
      // 判断登录的用户是否收藏该书籍
      flag: true
    };
  },
  methods: {
    spread() {
      var ele = document.getElementsByClassName("coverdesc")[0];
      this.showflag = !this.showflag;
      if (this.showflag) {
        ele.style.height = "60px";
      } else {
        ele.style.height = "auto";
      }
    },
    gocatalog(itemid, itemtitle) {
      this.$router.push({
        name: "catalog",
        query: { id: itemid, title: itemtitle }
      });
    },
    gopage(itemid) {
      this.$router.push({
        name: "page",
        query: { id: itemid, start: 0, index: 0 }
      });
    },
    newpage(itemid) {
      this.$router.push({
        name: "page",
        query: { id: itemid, start: 0, index: 1, flag: true }
      });
    },
    // 点击收藏
    bookrank(data) {
      // 判断是否登录
      if (!this.userinfo.islogin) {
        this.$toast("您还未登录,请先登录~");
      } else {
        // 本地存储用户信息
        var user = JSON.parse(localStorage.getItem("user"));
        // 存储书籍信息
        user.forEach(ele => {
          if (ele.name == this.userinfo.user.name) {
            if (ele.booklist == undefined) {
              ele.booklist = [];
              ele.booklist.push({
                title: data.title,
                cover: data.cover,
                id: data._id
              });
              localStorage.setItem("user", JSON.stringify(user));
            } else {
              ele.booklist.push({
                title: data.title,
                cover: data.cover,
                id: data._id
              });
              localStorage.setItem("user", JSON.stringify(user));
            }
           this.flag = false;
           this.$toast("收藏成功")
          }
        });
      }
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.$axios({
      method: "GET",
      url: "/book/"+id
    })
      .then(result => {
        this.infodata = result;
        // console.log(this.infodata)
        this.infodata.data.longIntro = this.infodata.data.longIntro.split(/\s+/)
       
      })
      .catch(err => {
        console.log(err);
      });

    // 获取用户登录信息
    var info = JSON.parse(sessionStorage.getItem("loginstatus"));
    if (info != null) {
      this.userinfo = info;
    }
    // 如果用户登录
    if (this.userinfo.islogin) {
      // 书籍本地存储
      var user = JSON.parse(localStorage.getItem("user"));
      // 当前用户登录信息
      var userel = user.find(ele => {
        return ele.name == this.userinfo.user.name;
      });
      // 如果当前用户存储的书籍不为空
      if (userel.booklist != undefined) {
        userel.booklist.forEach(element => {
          // console.log(id)
          // console.log(element)
          if (element.id == id) {
            this.flag = false;
          }
        });
      }
    }
  },
  filters: {
    halo(val) {
      return (val / 10000).toFixed(1);
    }
  }
};
</script>
