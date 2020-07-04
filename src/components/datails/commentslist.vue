<template>
  <div>
    <div class="commentitle">精彩评论</div>
    <div class="showcoment"></div>
    <div v-show="comintflag" class="comentips">暂无评论</div>
    <div v-show="infodata" class="comment-body" v-for="(item,index) in infodata" :key="index">
      <div class="comment-icon">
        <img src="../../assets/images/icon.jpg" class="auto-img" alt />
      </div>
      <div class="comment-box">
        <div class="info-name">{{item.title}}</div>
        <div class="likecount">
          <span>{{item.likeCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="iconfont icon-dianzan"></span>
        </div>
        <div class="comment-content">
          {{item.content}}
          <span
            v-show="!item.showflag"
            class="iconfont icon-more"
            @click="spread(index)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.commentitle {
  margin: 16px 0px;
  padding: 0px 16px;
  font-size: 14px;
  color: #333;
  border-left: 2px solid #00c98d;
  border-bottom: 1px solid #f0f0f0;
}

.comentips {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  background-color: #e6e6e6;
  color: #999;
  font-weight: 600;
}

.comment-body {
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
  .comment-icon {
    width: 40px;
    height: 40px;
    float: left;
    margin-right: 15px;
  }
  .comment-box {
    overflow: hidden;
    width: auto;
    position: relative;
    .info-name {
      width: calc(100% - 40px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 10px;
      font-size: 14px;
      color: #999;
      line-height: 1.5;
    }
    .likecount {
      position: absolute;
      top: 0px;
      right: 0px;
      color: #999;
      font-size: 14px;
      > .icon-dianzan {
        font-size: 20px;
      }
    }
    .comment-content {
      text-indent: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      padding-right: 10px;
      .icon-more {
        position: absolute;
        bottom: 0px;
        right: 0px;
        height: 18px;
        text-align: center;
        line-height: 20px;
        background-color: #fff;
        text-align: center;
        font-size: 20px;
        padding-right: 20px;
         color: #999;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      infodata: "",
      comintflag: false,
       showflag:true
    };
  },
  methods: {
    spread(index) {
      var ele = document.getElementsByClassName("comment-content")[index];
      ele.showflag = !ele.showflag;
      if (ele.showflag) {
        ele.style.display = "block";
      } else {
        ele.style.display = "-webkit-box";
      }
    }
  },
  mounted() {
    var id = this.$route.query.id;
    var self = this;
    this.$axios({
      method: "GET",
      url: "/post/review/best-by-book?book=" + id,
      params: {
        limit: 3
      }
    })
      .then(result => {
        if (result.data.reviews.length == 0) {
          self.comintflag = true;
        }
        this.infodata = result.data.reviews;
      })
      .catch(err => {
      });
  }
};
</script>