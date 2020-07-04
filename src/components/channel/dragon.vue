<template>
  <div>
    <!-- title -->
    <div class="title">{{id}}</div>
    <div class="books-group">
      <ul class="swiper-wrapper">
        <li
          class="swiper-slide"
          v-for="(item,index) in swdata"
          :key="index"
          @click="godatails(item)"
        >
          <div class="book-img">
            <img :src="`http://statics.zhuishushenqi.com`+ item.cover" class="auto-img" alt />
          </div>
          <p class="book-title">{{item.title}}</p>
          <p class="book-author">{{item.author}}</p>
        </li>
      </ul>
    </div>
    <!-- 列板 -->
    <div
      class="books-list-item"
      v-for="(item,index) in listdata"
      :key="index"
      @click="godatails(item)"
    >
      <div class="books-list-item-title">
        <!-- tips -->
        <div class="books-list-item-text">{{item.title}}</div>
        <div class="tags">
          <span class="tagsitem">{{item.tags[0]}}</span>
          <span class="tagsitem mag">{{item.tags[1]}}</span>
        </div>
      </div>
      <!-- img -->
      <div class="content">
        <div class="imgbox">
          <img :src="'http://statics.zhuishushenqi.com'+ item.cover" class="auto-img" alt />
        </div>
        <div class="books-list-item-desc">
          <div class="item">{{item.shortIntro}}</div>
        </div>
      </div>
    </div>
    <div class="chang">
      <span>换一换</span>
      <span class="iconfont icon-f14" @click="changdata"></span>
    </div>
    <div class="seperator"></div>
  </div>
</template>

<style lang="less" scoped>
.title {
  line-height: 1.5;
  padding-top: 15px;
  padding-left: 15px;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 16px;
    height: 15px;
    border: 2px solid #00c98d;
  }
}
.books-group {
  padding: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f3f3;
  > ul {
    width: 100%;
    overflow: hidden;
    > li {
      float: left;
      width: 74px;
      margin-right: 16px;
      .book-img {
        height: 100px;
        overflow: hidden;
      }
      .book-title {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgb(51, 51, 51);
      }
      .book-author {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgb(153, 153, 153);
      }
    }
  }
}

.books-list-item {
  padding: 16px;
  border-bottom: 1px solid #f0f0f2;
  .books-list-item-title {
    margin-bottom: 16px;
    .books-list-item-text {
      float: left;
      width: 200px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #333;
      font-weight: 600;
    }
    .tags {
      overflow: hidden;
      width: auto;
      height: 20px;
      line-height: 20px;
      text-align: right;
      .tagsitem {
        font-size: 10px;
        line-height: 1.5;
        border: 1px solid #e8e8e8;
        color: #70a7e3;
        padding: 3px 5px;
      }
      .mag {
        margin-left: 10px;
      }
    }
    .books-list-item-desc {
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      color: #999;
    }
  }
  .content {
    .imgbox {
      float: left;
      width: 74px;
      height: 100px;
      overflow: hidden;
    }
    .books-list-item-desc {
      overflow: hidden;
      width: auto;
      height: 100px;
      padding: 10px 0px 0px 16px;
      box-sizing: border-box;
      .item {
        box-sizing: border-box;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #999;
        font-size: 14px;
      }
    }
  }
}
.chang {
  text-align: center;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  color: rgb(51, 51, 51);
  .icon-f14 {
    margin-left: 5px;
  }
}
.seperator {
  height: 8px;
  background-color: #f0f0f2;
}
</style>

<script>
export default {
  name: "gradon",
  data() {
    return {
      hotdata: { data: { books: [] } },
      start: 0,
      count: 6,
      swdata: "",
      listdata: ""
    };
  },
  props: ["id", "sex"],
  watch: {
    id: function(newval) {
      this.id = newval;
      this.$axios({
        method: "GET",
        url: `/book/by-categories?gender=${this.sex}&type=hot&major=${this.id}`,
        params: {
          minor: "",
          start: this.start,
          limit: this.count
        }
      }).then(result => {
        this.hotdata = result;
        this.swdata = this.hotdata.data.books.slice(0, 4);
        this.listdata = this.hotdata.data.books.slice(4, 7);
      });
    }
  },
  methods: {
    axios() {
      this.$axios({
        method: "GET",
        url: `/book/by-categories?gender=${this.sex}&type=hot&major=${this.id}`,
        params: {
          minor: "",
          start: this.start,
          limit: this.count
        }
      }).then(result => {
        if (result.data.books.length < this.count) {
          this.start = 0;
          return false;
        } else {
          this.hotdata = result;
          this.swdata = this.hotdata.data.books.slice(0, 4);
          this.listdata = this.hotdata.data.books.slice(4);
        }
      });
    },
    changdata() {
      this.start += this.count;
      this.axios();
    },
    godatails(item) {
      this.$router.push({ name: "datails", query: { id: item._id } });
    }
  },
  mounted() {
    this.$axios({
      method: "GET",
      url: `/book/by-categories?gender=${this.sex}&type=hot&major=${this.id}`,
      params: {
        minor: "",
        start: this.start,
        limit: this.count
      }
    }).then(result => {
      this.hotdata = result;
      //   this.swdata = this.hotdata.data.books.slice(0, 4);
      //   this.listdata = this.hotdata.data.books.slice(4);
    });
  }
};
</script>