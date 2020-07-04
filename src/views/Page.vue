<template>
  <div>
    <div class="page-box" @click="operatefunc">
      <!-- 文章 -->
      <div class="article">
        <div v-for="(arcitem,arcindex) in chapterlist" :key="arcindex">
          <div class="art-title">{{arcitem.title}}</div>
          <p class="art-body" v-for="(item,index) in arcitem.content" :key="index">{{item}}</p>
          <div class="art-isolation"></div>
        </div>
      </div>
      <!-- 操作菜单 -->
      <div class="operate">
        <div class="nav animated fadeInDownBig">
          <div class="lefticon fl" @click="goback">
            <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
          </div>
          <div class="righticon fr" @click="gohome">
            <span class="iconfont icon-1"></span>
          </div>
          <div class="middle">{{title}}</div>
        </div>
        <div class="bottom-controll animated fadeInUpBig">
          <!-- 字体滑块 -->
          <div class="scroll-contant">
            <span class="fl" @click.stop="addSize">Aa+</span>
            <span class="fr" @click.stop="recSize">Aa-</span>
            <div class="scroll-controll">
              <van-slider v-model="value" />
            </div>
          </div>
          <!-- 背景色 -->
          <div class="button-contant">
            <van-button
              class="btactive"
              plain
              type="info"
              @click.stop="changbg({bgcolor:'antiquewhite',fontcolor:'#000',index:0})"
            >默认</van-button>
            <van-button
              plain
              type="info"
              @click.stop="changbg({bgcolor:'#0c0c0c',fontcolor:'#666',index:1})"
            >夜间</van-button>
            <van-button
              plain
              type="info"
              @click.stop="changbg({bgcolor:'#b8cd8d',fontcolor:'#0c2e10',index:2})"
            >护眼</van-button>
          </div>
          <!-- 章节切换 -->
          <div class="chaptertab">
            <span @click="nextchapter">上一章</span>
            <span @click="showPopup">目录</span>
            <span @click="prevchapter">下一章</span>
          </div>
        </div>
      </div>
      <!-- 目录弹出层 -->
      <div class="popup-catalog" v-show="show" @click.stop="hidenmenu">
        <div class="van-popup">
          <div class="popup-scl">
            <div class="art-title">{{title}}</div>
            <p class="art-catalog">目录</p>
            <div
              class="popup-item"
              v-for="(itt,inn) in prouplist"
              :key="inn"
              @click.stop="changurl(inn)"
            >{{itt.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.page-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: antiquewhite;
  overflow-y: scroll;
  .article {
    padding: 20px 15px;
    .art-title {
      font-size: 20px;
      text-indent: 40px;
      font-weight: 600;
      margin: 15px 0px;
    }
    .art-body {
      font-size: 16px;
      text-indent: 32px;
      line-height: 1.5;
      margin: 8px 0px;
      text-align: justify;
    }
    .art-isolation {
      height: 20px;
    }
  }
  .operate {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: none;
    .nav {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 44px;

      background-color: rgba(0, 0, 0, 0.8);
      z-index: 999;
      border-bottom: 1px solid #f0f0f0;
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
        color: white;
        font-size: 16px;
      }
    }
    .bottom-controll {
      padding: 16px 10px;
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 999;
      border-top: 1px solid #f0f0f0;
      .scroll-contant {
        > span {
          width: 50px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          color: white;
          font-size: 18px;
        }
        .scroll-controll {
          overflow: hidden;
          width: auto;
          height: 30px;
          line-height: 30px;
          padding: 0px 30px;
          .van-slider {
            margin-top: 15px;
          }
          .van-slider__button {
            width: 0px;
            height: 0px;
          }
        }
      }
      .button-contant {
        margin: 25px 0px;
        > .van-button {
          width: calc(33.33% - 20px);
          margin: 0px 10px;
          height: 36px;
          line-height: 36px;
          padding: 0px;
          text-align: center;
          background-color: transparent;
          color: white;
          border-radius: 5px;
        }
        .btactive {
          background-color: #2ad29f;
          color: #000;
        }
      }
    }
    .chaptertab {
      margin-top: 10px;
      > span {
        display: inline-block;
        width: 33.33%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: white;
        font-size: 16px;
      }
    }
  }
  // 目录弹出
  .popup-catalog {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .van-popup {
    overflow-y: scroll;
    padding-left: 16px;
    width: 60%;
    height: 100%;
    background-color: #fff;
    .popup-scl {
      > .art-title {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: 600;
        color: #333;
        padding: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      > .art-catalog {
        margin: 10px 0px;
        font-size: 16px;
        font-weight: 600;
        color: #999;
      }
      .popup-item {
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #aaaaaa;
      }
      .popup-active {
        color: red;
      }
    }
  }
}
</style>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      value: 25,
      // 当前章节网址
      url: "",
      // 当前章节名
      title: "",
      // 书封面
      cover: "",
      //书籍id
      id: 0,
      //传入的目录页数索引值
      start: 0,
      //传入的目录列表索引值
      index: 0,
      //菜单显示
      operateshow: false,
      //目录弹出层
      show: false,
      //目录数据存放
      prouplist: [],
      // 文章数据存放
      chapterlist: [],
      // 章节索引值
      limit: "",
      // 是否最新章
      flag: false,
      // 登录用户信息
      userinfo: {
        islogin: false,
        user: ""
      },
      // 阅读历史
      viewlist: []
    };
  },
  watch: {
    // 监听章节切换
    limit: function(newval) {
      this.url = this.prouplist[this.limit].link;
      this.$toast({
        message: "加载中",
        icon: require("../assets/images/640.gif")
      });
      // 获取章节
      this.$axios({
        method: "GET",
        url: "/content/chapter/" + encodeURIComponent(this.url)
      })
        .then(result => {
          this.$toast.clear();
          this.chapterlist.push({
            content: result.data.chapter.cpContent.split(/\s+/),
            title: result.data.chapter.title
          });
          // 记录当前章节名
          this.title = result.data.chapter.title;
        })
        .catch(err => {
          this.$toast.fail({
            message: "数据加载出错 书籍已下架",
            duration: 3000
          });
        });
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    gohome() {
      this.$router.push({ name: "home" });
    },
    // 菜单显示隐藏
    operatefunc() {
      // 函数防抖
      var timer = null;
      var self = this;
      function foo() {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          if (self.operateshow) {
            $(".operate").hide(600);
            self.operateshow = false;
          } else {
            $(".operate").show(600);
            self.operateshow = true;
          }
        }, 500);
      }
      foo();
    },
    // 遮罩层弹出
    showPopup() {
      this.show = true;
      var el = document.getElementsByClassName("popup-item")[this.limit];
      el.classList.add("popup-active");

      var el = document.getElementsByClassName("van-popup")[0];

      this.$nextTick(() => {
        el.scrollTop = this.limit * 40 - 400;
      });
    },
    // 章节切换
    changurl(index) {
      this.chapterlist = [];
      this.limit = index;
      document.getElementsByClassName("popup-item").forEach(element => {
        element.classList.remove("popup-active");
      });
      document
        .getElementsByClassName("popup-item")
        [this.limit].classList.add("popup-active");
    },
    hidenmenu() {
      this.show = false;
      $(".operate").hide(600);
    },
    // 上一章
    prevchapter() {
      this.chapterlist = [];
      this.limit =
        this.limit >= this.prouplist.length
          ? this.prouplist.length
          : (this.limit += 1);
    },
    // 下一章
    nextchapter() {
      this.chapterlist = [];
      this.limit = this.limit <= 0 ? 0 : (this.limit -= 1);
    },
    // 增大字体
    addSize() {
      this.value = this.value >= 100 ? 100 : (this.value += 25);
      var perce = (this.value - 25) / 100 + 1;

      document.getElementsByClassName("art-title").forEach(element => {
        element.style.fontSize = 20 * perce + "px";
      });
      document.getElementsByClassName("art-body").forEach(element => {
        element.style.fontSize = 16 * perce + "px";
      });
    },
    // 减小字体
    recSize() {
      this.value = this.value <= 0 ? 100 : (this.value -= 25);
      var perce = (this.value - 25) / 100 + 1;

      document.getElementsByClassName("art-title").forEach(element => {
        element.style.fontSize = 20 * perce + "px";
      });
      document.getElementsByClassName("art-body").forEach(element => {
        element.style.fontSize = 16 * perce + "px";
      });
    },
    // 改变背景
    changbg(obj) {
      document.getElementsByClassName("van-button").forEach(ele => {
        ele.classList.remove("btactive");
      });
      document
        .getElementsByClassName("van-button")
        [obj.index].classList.add("btactive");
      var ele = document.getElementsByClassName("page-box")[0];
      ele.style.backgroundColor = obj.bgcolor;
      ele.style.color = obj.fontcolor;
    }
  },
  mounted() {
    //书id
    var id = this.$route.query.id;

    // 最新章
    this.flag = this.$route.query.flag;

    //找到下标
    this.start = this.$route.query.start;
    this.index = this.$route.query.index;
    // 书名
    this.title = this.$route.query.title;

    // api已改，先获取源下的小说id,不能直接通过小说id获取id了,
    // 获取小说源id  /atoc正版盗版混合  /btoc 正版源
    this.$axios({
      method: "GET",
      url: `btoc?view=summary&book=` + id
    }).then(result => {
      this.id = result.data[0]._id;
      // console.log(id,"原id")
      // console.log(this.id,"源id")

      // 获取小说章节
      this.$axios({
        method: "GET",
        url: `btoc/${this.id}?view=chapters`
      }).then(result => {
        this.$toast.clear();
        // console.log(result, "mulu");
        if (result.data.chapters == null) {
          this.$toast.fail({
            message: "数据加载出错 书籍已下架",
            duration: 3000
          });
          return;
        }
        // 获取目录
        this.prouplist.push(...result.data.chapters);

        if (this.flag) {
          // 获取最新章节
          this.limit = result.data.chapters.length - 1;
        } else {
          // 获取目录索引值
          this.limit = parseInt(this.start) + parseInt(this.index);
        }
        // 获取章节
        this.url = result.data.chapters[this.limit].link;
      });
    });

    var pagebox = document.getElementsByClassName("page-box")[0];
    var articlebox = document.getElementsByClassName("article")[0];

    //  滚动进入下一页
    var timer = null;
    var self = this;
    pagebox.onscroll = function() {
      function foo() {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          if (
            articlebox.clientHeight - pagebox.clientHeight - pagebox.scrollTop <
            300
          ) {
            self.limit += 1;
          }
        }, 1000);
      }
      foo();
    };

    // 获取书籍信息   封面
    this.$axios({
      method: "GET",
      url: "/book/" + id
    })
      .then(result => {
        // console.log(result,'book')
        this.cover = result.data.cover;
      })
      .catch(err => {
        console.log(err);
      });
  },

  beforeRouteLeave(to, from, next) {
    // 获取用户登录信息
    var info = JSON.parse(sessionStorage.getItem("loginstatus"));
    if (info != null) {
      this.userinfo = info;
    }

    // 如果用户登录
    if (this.userinfo.islogin) {
      // 获取本地存储信息
      var user = JSON.parse(localStorage.getItem("user"));

      // 当前用户阅读信息
      user.forEach(ele => {
        if (ele.name == this.userinfo.user.name) {
          // 如果当前资源无法请求，不存入
          if (this.limit == "") {
            return;
          }
          if (ele.viewlist == undefined) {
            ele.viewlist = [];
            ele.viewlist.push({
              // id
              id: this.id,
              // 标题
              title: this.title,
              // 索引值
              limit: this.limit,
              // 封面
              cover: this.cover
            });
            localStorage.setItem("user", JSON.stringify(user));
          } else {
            ele.viewlist = ele.viewlist.filter(element => {
              return element.id != this.id;
            });
            ele.viewlist.push({
              // id
              id: this.id,
              // 标题
              title: this.title,
              // 索引值
              limit: this.limit,
              // 封面
              cover: this.cover
            });
            localStorage.setItem("user", JSON.stringify(user));
          }
        }
      });
    }
    next();
  }
};
</script>