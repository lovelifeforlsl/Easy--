<template>
  <div>
    <div class="title">{{id}}</div>
    <div class="books-group">
      <ul class="swiper-wrapper">
        <li class="swiper-slide" v-for="(item,index) in hotdata.data.books" :key="index"  @click="godatails(item)">
          <div class="book-img">
            <img :src="`http://statics.zhuishushenqi.com`+ item.cover" class="auto-img" alt />
          </div>
          <p class="book-title">{{item.title}}</p>
          <p class="book-author">{{item.author}}</p>
        </li>
      </ul>
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
  position: relative;
  font-weight: 600;
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
  border-bottom: 1px solid #f3f3f3;
  > ul {
    overflow-x: scroll;
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
  name: "hotsearch",
  data() {
    return {
      hotdata: { data: { books: [] } },
      start: 0,
      count: 10
    };
  },
  props: ["id", "sex"],
  watch: {
    id: function(newval, oldval) {
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
    });
  }
};
</script>