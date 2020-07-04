<template>
  <div>
    <div class="Typenav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr" @click="gohome">
        <span class="iconfont icon-1"></span>
      </div>
      <div class="middle">{{title}}</div>
    </div>

    <div class="typecontent clearfix">
      <div class="typeitem" v-for="(item,index) in books" :key="index" @click="godatails(item.book._id)">
        <div class="coverbox">
          <img
            :src="'http://statics.zhuishushenqi.com'+ item.book.cover"
            class="auto-img"
            alt
            srcset
          />
        </div>
        <div class="typetitle">{{item.book.title}}</div>
        <div class="typecomment">{{item.comment}}</div>
        <div class="typecata">
          <span>{{item.book.majorCate}}</span>
          <span>{{item.book.minorCate}}</span>
        </div>
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

<style lang="less">
.Typenav {
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
.typecontent {
  padding: 45px 0px 45px 16px;
  box-sizing: border-box;
  .typeitem {
    float: left;
    width: calc(50% - 18px);
    margin-right: 16px;
    margin-top: 16px;
    border: 1px solid #00c98d;
    border-radius: 5px;
    overflow: hidden;
    > .coverbox {
      height: 160px;
      width: 80%;
      margin: 0 auto;
      overflow: hidden;
      > img {
        height: 160px;
      }
    }
  }
  .typetitle {
    font-size: 14px;
    color: #333;
    text-align: center;
    margin: 5px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .typecomment {
    padding: 0px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-indent: 1.5;
  }
  .typecata {
    text-align: center;
    margin: 10px;
    > span {
      padding: 0px 5px;
      height: 1.5;
      border: 1px solid #00c98d;
      border-radius: 5px;
      margin: 0px 5px;
    }
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

<script>
export default {
  data() {
    return {
      title: "",
      books: []
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    gohome() {
      this.$router.push({ name: "home" });
    },
    godatails(itemid){
        this.$router.push({name:'datails',query:{id:itemid}})
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    this.$axios({
      method: "GET",
      url: "/book-list/" + id
    }).then(result => {
      console.log(result, "result");
      this.title = result.data.bookList.title;
      this.books = result.data.bookList.books;
      this.$toast.clear();
    });
  }
};
</script>