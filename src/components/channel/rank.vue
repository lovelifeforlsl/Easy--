<template>
  <div>
    <div class="title">{{id}}</div>
    <!-- 横版 -->
    <div
      class="books-list-item"
      v-for="(item,index) in swdata"
      :key="index"
      @click="godatails(item)"
    >
      <div class="content">
        <div class="imgbox">
          <img :src="'http://statics.zhuishushenqi.com'+ item.cover" class="auto-img" alt />
          <div class="num-ico">
            <img src="../../assets/images/numico.png" class="auto-img" alt />
          </div>
        </div>
        <div class="books-list-item-desc">
          <div class="books-list-item-text">{{item.title}}</div>
          <div class="books-list-item-author">{{item.author}}</div>
          <div class="item">{{item.shortIntro}}</div>
          <div class="tageslist">
            <!-- <span v-for="(itt,ind) in item.tags" :key="ind">{{itt}}</span> -->
            <span>{{item.tags[0]}}</span>
            <span>{{item.tags[1]}}</span>
            <span>{{item.tags[2]}}</span>
            <span>{{item.tags[3]}}</span>
            <span>{{item.tags[4]}}</span>
            <span>{{item.tags[5]}}</span>
          </div>
        </div>
      </div>
      <!-- 列版 -->
      <div class="listcont">
        <div
          class="books-list-item-title"
          v-for="(item,index) in listdata"
          :key="index"
          @click="godatails(item)"
        >
          <div class="books-list-item-text">
            <i class="idxcolor">{{index+2}}</i>
            <span class="booktitle">{{item.title}}</span>
          </div>
          <div class="tags">
            <span class="tagsitem">{{item.tags[0]}}</span>
            <span class="tagsitem mag">{{item.tags[1]}}</span>
          </div>
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

.books-list-item {
  padding: 0px 16px;
  border-bottom: 1px solid #f0f0f2;

  .content {
    margin: 10px 0px;
    border-bottom: 1px solid #f0f0f2;
    .imgbox {
      float: left;
      width: 84px;
      height: 112px;
      overflow: hidden;
      position: relative;
      > .num-ico {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 22px;
      }
    }
    .books-list-item-desc {
      overflow: hidden;
      width: auto;
      height: 112px;
      padding: 0px 0px 0px 16px;
      box-sizing: border-box;
      .books-list-item-text {
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .books-list-item-author {
        font-size: 14px;
        color: #999;
        margin: 5px;
      }
      .item {
        box-sizing: border-box;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #999;
        font-size: 12px;
      }
      .tageslist {
        padding: 7px 0px;
        white-space: nowrap;
        overflow: hidden;
        // overflow-x: scroll;
        > span {
          font-size: 12px;
          color: #00c98d;
          border: 1px solid #f0f0f0;
          padding: 2px 3px;
        }
      }
    }
  }
  .listcont {
    .books-list-item-title {
      border-bottom: 1px solid #f0f0f2;
      .books-list-item-text {
        float: left;
        width: 200px;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        > .idxcolor {
          color: #ffbe73;
          margin-right: 20px;
        }
        > .booktitle {
          color: #333;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .tags {
        overflow: hidden;
        width: auto;
        height: 48px;
        line-height: 48px;
        text-align: right;
        .tagsitem {
          font-size: 12px;
          line-height: 1.5;
          border: 1px solid #e8e8e8;
          color: #70a7e3;
          padding: 3px 5px;
        }
        .mag {
          margin-left: 10px;
        }
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
  name: "rank",
  data() {
    return {
      hotdata: { data: { books: [{}, {}, {}] } },
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
        this.swdata = this.hotdata.data.books.slice(0, 1);
        this.listdata = this.hotdata.data.books.slice(1, 7);
      });
    },
    sex: function(newval) {
      this.sex = newval;
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
          this.swdata = this.hotdata.data.books.slice(0, 1);
          this.listdata = this.hotdata.data.books.slice(1);
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