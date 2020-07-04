<template>
  <div class="bookbox">
    <div id="navtop"></div>
    <div class="bookcontant">
      <div
        class="sdlist"
        v-for="(item,index) in bookdata.data.bookLists"
        :key="index"
        @click="gotype(item._id)"
      >
        <div class="sdlist-cover">
          <img
            v-show="item.cover"
            :src="`http://statics.zhuishushenqi.com`+item.cover"
            class="auto-img"
            alt
          />
          <img v-show="!item.cover" src="../../assets/images/picerr.jpg" class="auto-img" alt />
        </div>
        <div class="sdlist-info">
          <div class="sdlist-title">{{item.title}}</div>
          <div class="sdlist-desc">{{item.desc}}</div>
          <div class="readtips">
            <span class="fl">{{item.author}}</span>
            <span class="fr">{{item.readCount}}人关注</span>
          </div>
        </div>
      </div>
      <div class="tosttile">加载更多...</div>
    </div>
    <div class="backtop">
      <a href="#navtop" class="iconfont icon-huidaodingbu3 auto-img"></a>
    </div>
  </div>
</template>

<style lang="less">
.bookbox {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
  #navtop {
    height: 5px;
    width: 100%;
    background: #f2f2f2;
  }
  .sdlist {
    padding: 16px;
    .sdlist-cover {
      width: 80px;
      height: 100px;
      overflow: hidden;
      margin-left: 10px;
      float: right;
      > img {
        height: 100px;
      }
    }
    .sdlist-info {
      overflow: hidden;
      width: auto;
      height: 100px;
      .sdlist-title {
        font-size: 16px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 600;
      }
      .sdlist-desc {
        margin-top: 10px;
        font-size: 14px;
        color: #999;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .readtips {
        margin-top: 10px;
        font-size: 12px;
        color: #999;
        overflow: hidden;
        padding: 0px 10px;
        line-height: 20px;
        line-height: 20px;
      }
    }
  }

  .tosttile {
    height: 50px;
    line-height: 50px;
    color: #333;
    background-color: #f2f2f2;
    font-size: 16px;
    text-align: center;
  }
  .backtop {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    z-index: 999;
    display: none;
    > .icon-huidaodingbu3 {
      font-size: 40px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      color: #1296db;
      overflow: hidden;
      background-color: #fff;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      bookdata: { data: { bookLists: [] } },
      start: 0,
      limit: 20
    };
  },

  methods: {
    gotype(itemid) {
      this.$router.push({ name: "type", query: { id: itemid } });
    }
  },
  mounted() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    this.$axios({
      method: "GET",
      url: "/book-list?sort=hot&duration=玄幻",
      params: {
        start: this.start,
        limit: this.limit
      }
    }).then(result => {
      this.bookdata = result;
      console.log(result);
    });

    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    var box = document.getElementsByClassName("bookbox")[0];
    var backtop = document.getElementsByClassName("backtop")[0];
    box.style.height = h - 44 + "px";
    if (box.scrollTop < 500) {
      backtop.style.display = "none";
    } else {
      backtop.style.display = "block";
    }

    // 函数防抖
    var timer = null;
    var self = this;
    box.onscroll = function() {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        var cont = document.getElementsByClassName("bookcontant")[0];
        // console.log(box.scrollTop)
        // console.log(cont.clientHeight);
        if (cont.clientHeight - box.scrollTop - box.clientHeight < 300) {
          self.start += self.limit;
          self.$toast.loading({
            message: "加载中...",
            forbidClick: true
          });
          self
            .$axios({
              method: "GET",
              url: "/book-list?sort=hot&duration=玄幻",
              params: {
                start: self.start,
                limit: self.limit
              }
            })
            .then(result => {
              if (result.data.bookLists.length == 0) {
                document.getElementsByClassName("tosttile")[0].innerHTML =
                  "没有更多了！";
                return;
              }
              self.bookdata.data.bookLists.push(...result.data.bookLists);
              self.$toast.clear();
            });
        }
      }, 1000);
    };
  }
};
</script>