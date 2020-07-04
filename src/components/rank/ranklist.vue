<template>
  <div>
    <div
      class="booklist"
      v-for="(item,index) in rightlist.data.ranking.books"
      :key="index"
      @click="godatails(item)"
    >
      <div class="imgbox">
        <img :src="`http://statics.zhuishushenqi.com`+item.cover" class="auto-img" alt />
      </div>
      <div class="content">
        <div class="dectitle">{{index+1}}.{{item.title}}</div>
        <div class="desc">{{item.shortIntro}}</div>
        <div class="sku clearfix">
          <span class="author fl">{{item.author}}</span>
          <span class="classify fr">{{item.majorCate}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style  lang="less">
.booklist {
  padding: 10px;
  overflow: hidden;
  .imgbox {
    width: 60px;
    height: 87px;
    overflow: hidden;
    float: left;
  }
  .content {
    overflow: hidden;
    width: auto;
    padding-left: 10px;
    .dectitle {
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      padding-bottom: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .desc {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 12px;
      color: #999;
    }
    .sku {
      font-size: 10px;
      height: 30px;
      line-height: 30px;
      .classify {
        padding: 5px;
        background-color: #efeff4;
        color: #777;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      rightlist: { data: { ranking: { books: [] } } }
    };
  },
  props: ["idname"],
  watch: {
    idname: function(newval) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.$axios.get(`/ranking/${newval}`).then(result => {
        this.rightlist = result;
        this.$toast.clear();
      });
    }
  },
  methods: {
    godatails(item) {
      this.$router.push({ name: "datails", query: { id: item._id } });
    }
  }
};
</script>