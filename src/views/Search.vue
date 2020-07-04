<template>
  <div class="search-box">
    <div class="nav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr" @click="gohome">
        <span class="iconfont icon-1"></span>
      </div>
      <div class="middle">搜索中心</div>
    </div>
    <!-- 搜索框 -->
    <div class="serach-form">
      <form action="/">
        <van-search
          id="vansearch"
          v-model="value"
          placeholder="书名/作者/关键词"
          background="#f2f2f2"
          @input="onSearch"
          @search="onSubmit"
        />
      </form>
    </div>
    <div class="wrap">
      <!-- 热词 -->
      <div class="hotrecomm_wrap" v-show="showflag">
        <div class="hotrecomm clearfix">
          <div
            class="ellipsis"
            v-for="(item,index) in hotsearch"
            :key="index"
            @click="gocole(item.word)"
          >{{item.word}}</div>
        </div>
        <div class="changecomm">
          <span>换一换</span>
          <span class="iconfont icon-f14" @click="changdata"></span>
        </div>
      </div>
      <!-- 自动补充 -->
      <div class="suglist">
        <div class="key-search" v-for="(itt,inn) in compsearch" :key="inn" @click="onSubmit">{{itt}}</div>
      </div>
      <!-- 模糊搜索 -->
      <div class="listsmall" v-show="!showflag">
        <div
          class="searchlist-item"
          v-for="(iteminfo,indexinfo) in datailsearch"
          :key="indexinfo"
          @click="godatails(iteminfo)"
        >
          <div class="list-img">
            <img :src="`http://statics.zhuishushenqi.com`+iteminfo.cover" class="auto-img" alt />
          </div>
          <div class="list-info">
            <div class="title">{{iteminfo.title}}</div>
            <p class="author">{{iteminfo.author}}</p>
            <div class="datils clearfix">
              <span>{{iteminfo.wordCount}}万字</span>
              <span>{{iteminfo.cat}}</span>
            </div>
            <p class="lastChapter">{{iteminfo.lastChapter}}</p>
          </div>
        </div>
      </div>
      <div class="seperator"></div>
      <!-- 搜索历史 -->
      <div class="search-history" v-show="showflag">
        <div class="search-title">
          搜索历史
          <span class="iconfont icon-shanchu" @click="delhistory"></span>
        </div>
        <div
          class="hisitem"
          v-for="(hisitem,hisindex) in historylist"
          :key="hisindex"
          @click="gocole(hisitem)"
        >{{hisitem}}</div>
      </div>
      <div class="seperator"></div>
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
  </div>
</template>

<style scpoed lang="less">
.search-box {
  padding-top: 45px;
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
// 热词搜索
.hotrecomm_wrap {
  padding-top: 10px;
  position: relative;
  .hotrecomm {
    padding: 0px 16px;
    .ellipsis {
      float: left;
      width: calc(33.33% - 32px);
      margin: 10px 15px;
      border-radius: 10px;
      padding: 0px 8px;
      box-sizing: border-box;
      border: 1px solid #e6e6e6;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      text-align: center;
      line-height: 2;
      color: #333;
    }
  }
  .changecomm {
    border-top: 1px solid #e6e6e6;
    text-align: center;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: rgb(51, 51, 51);
    margin-top: 10px;
    .icon-f14 {
      margin-left: 5px;
    }
  }
}

.wrap {
  position: fixed;
  top: 110px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow-y: scroll;
  //自动补充
  .suglist {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    max-height: 253px;
    overflow-y: scroll;
    .key-search {
      width: 100%;
      height: 40px;
      background-color: #fff;
      line-height: 40px;
      padding-left: 20px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom: 1px solid #f2f2f2;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  //   模糊搜索
  .listsmall {
    .searchlist-item {
      padding: 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      .list-img {
        float: left;
        width: 66px;
        > img {
          height: 90px;
        }
      }
      .list-info {
        overflow: hidden;
        width: auto;
        padding-left: 20px;
        height: 90px;
        .title {
          font-size: 16px;
          color: #333;
          line-height: 1.5;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .author {
          font-size: 12px;
          color: #999;
          margin: 5px 0px;
        }
        .datils {
          font-size: 12px;
          color: #ccc;
          > span {
            float: left;
            padding: 0px 4px;
            margin-right: 10px;
            border: 1px solid #cccccc;
            border-radius: 5px;
          }
        }
        .lastChapter {
          margin-top: 5px;
          font-size: 12px;
          color: red;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}

// 搜索历史
.search-history {
  .search-title {
    margin: 16px 0px;
    padding: 0px 16px;
    font-size: 14px;
    color: #333;
    border-left: 2px solid #00c98d;
    position: relative;
    .icon-shanchu {
      position: absolute;
      bottom: 0px;
      right: 0px;
      line-height: 20px;
      background-color: #fff;
      opacity: 0.8;
      padding-right: 20px;
      text-align: center;
      font-size: 20px;
      color: red;
    }
  }
  .hisitem {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #e8e8e8;
  }
}

// 隔离
.seperator {
  height: 8px;
  background-color: #f0f0f2;
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

.van-search {
  padding: 16px;
  .van-search__content {
    background-color: #fff;
  }
}
</style>

<script>
export default {
  data() {
    return {
      value: "",
      timer: "",
      //   搜索热词
      hotsearch: [],
      hotstart: 0,
      hotlimit: 10,

      //自动补充
      compsearch: [],
      //   模糊搜索
      datailsearch: [],
      showflag: true,
      start: 0,
      limit: 20,

      //   搜索历史
      historylist: []
    };
  },
  methods: {
    goback() {
        if(this.showflag){
            this.$router.go(-1);
      }else{
          this.$router.go(0);
      }
    },
    gohome() {
      this.$router.push({ name: "home" });
    },
    // 模糊搜索
    onSearch() {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.bookcomplate();
      }, 100);
    },
    // 换一换
    changdata() {
      this.hotstart += this.hotlimit;
      this.bookhotsearch();
    },
    // 提交搜索
    onSubmit() {
      setTimeout(() => {
        this.showflag = false;
        this.compsearch = [];
        this.bookdatils();

        this.history();
        this.$nextTick(function() {
          console.log(this.historylist);
        });
      }, 500);
    },
    //根据名字模糊搜索
    bookdatils() {
      this.$axios({
        method: "GET",
        url: "/book/fuzzy-search?query=" + this.value
      }).then(result => {
        if (result.data.books.length < this.start) {
          return false;
        }
        this.datailsearch.push(
          ...result.data.books.slice(this.start, this.start + this.limit)
        );
        if (this.datailsearch.length == 0) {
          this.showflag = true;
          this.$toast("暂无搜索结果");
        }
      });
    },
    //获取搜索热词
    bookhotsearch() {
      this.$axios({
        method: "GET",
        url: "/book/search-hotwords"
      }).then(result => {
        if (this.hotstart >= result.data.searchHotWords.length) {
          this.hotstart = 0;
        }
        this.hotsearch = result.data.searchHotWords.slice(
          this.hotstart,
          this.hotstart + this.hotlimit
        );
      });
    },

    //自动补充
    bookcomplate() {
      this.$axios({
        method: "GET",
        url: "/book/auto-complete?query=" + this.value
      }).then(result => {
        this.compsearch = result.data.keywords;
      });
    },
    // 补充查询
    gocole(name) {
      this.showflag = false;
      this.compsearch = [];
      this.$axios({
        method: "GET",
        url: "/book/fuzzy-search?query=" + name
      }).then(result => {
        if (result.data.books.length < this.start) {
          return false;
        }
        this.datailsearch.push(
          ...result.data.books.slice(this.start, this.start + this.limit)
        );
        if (this.datailsearch.length == 0) {
          this.showflag = true;
          this.$toast("暂无搜索结果");
        }
      });
    },
    // 跳转列表页
    godatails(item) {
      this.$router.push({ name: "datails", query: { id: item._id } });
    },
    // 存储搜索历史
    history() {
      var history = JSON.parse(localStorage.getItem("history"));
      if (history == null) {
        history = [];
        history.push(this.value);

        this.historylist = history.reverse();
        localStorage.setItem("history", JSON.stringify(history));
      } else {
        history = history.filter(element => {
          return element != this.value;
        });

        history.push(this.value);

        this.historylist = history.reverse();
        localStorage.setItem("history", JSON.stringify(history));
      }
    },
    // 删除历史
    delhistory() {
      this.$nextTick(function() {
        localStorage.removeItem("history");
        this.historylist = [];
      });
    }
  },
  mounted() {
    this.bookhotsearch();

    var timer = null;
    var self = this;
    var el = document.getElementsByClassName("wrap")[0];
    var element = document.getElementsByClassName("listsmall")[0];
    el.onscroll = function() {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        if (element.clientHeight - el.scrollTop - el.clientHeight < 500) {
          self.start += self.limit;
          self.bookdatils();
        }
      }, 1000);
    };

    this.historylist = JSON.parse(localStorage.getItem("history"));
  }
};
</script>