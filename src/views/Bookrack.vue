<template>
  <div class="bookrack-box">
    <div class="racknav">
     <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr">
        <span class="iconfont icon-bianji7" v-show="!delflag" @click="delflag=!delflag"></span>
        <span class="iconfont icon-cuo3" v-show="delflag" @click="delflag=!delflag"></span>
      </div>
      <div class="middle">我的书架</div>
    </div>
    <div class="bookrack-contant">
      <div class="nologin" v-show="!userinfo.islogin">
        您还未登录，点击登录~
        <van-button size="small" type="primary" @click="gologin">登录</van-button>
      </div>
      <div class="booklist clearfix">
        <div class="collect-list" v-for="(item,index) in booklist" :key="index" @click="godatails(item)">
          <div class="book-img">
            <img :src="'http://statics.zhuishushenqi.com'+item.cover" class="auto-img" alt />
          </div>
          <div class="book-info">{{item.title}}</div>

          <span class="iconfont icon-cuo5" v-show="delflag" @click.stop="delcollect(index)"></span>
        </div>
      </div>
      <div class="book-tips" v-show="tipsflag">当前还未收藏任何书籍~</div>
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

<style scoped lang="less">
.bookrack-box {
  padding-top: 44px;
}
.racknav {
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
.bookrack-contant {
  padding-bottom: 20px;
  .nologin{
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 14px;
    .van-button {
      margin-left: 10px;
    }
  }
  .booklist {
    padding: 0px 0px 20px 20px;
    box-sizing: border-box;
    .collect-list {
      padding-right: 20px;
      padding-top: 20px;
      box-sizing: border-box;
      float: left;
      width: 33.33%;
      position: relative;
      .book-img {
        width: 100%;
        height: 140px;
        overflow: hidden;
        > img {
          height: 100%;
        }
      }
      .book-info {
        font-size: 14px;
        color: #333;
        font-weight: 600;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-top: 10px;
      }
      .icon-cuo5 {
        position: absolute;
        color: #ed1c24;
        top: 10px;
        right: 10px;
        font-size: 24px;
      }
    }
  }
  .book-tips{
    height: 100px;
    line-height:100px;
    font-size: 16px;
    color: #333;
    text-align: center;
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
      islogin: false,
      // 登录用户信息
      userinfo: {
        islogin: false,
        user: ""
      },
      //收藏列表
      booklist: [],
      // 删除按钮
      delflag: false,
      
      tipsflag:false,
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    gologin() {
      this.$router.push({ name: "login" });
    },
    delcollect(index) {
      this.booklist.splice(index, 1);
      
      if(this.booklist== undefined){
        this.tipsflag = true;
      }
      // 本地存储用户信息
      var user = JSON.parse(localStorage.getItem("user"));
      // 存储书籍信息
      user.forEach(ele => {
        if (ele.name == this.userinfo.user.name) {
          ele.booklist = this.booklist;
        }
      });
      localStorage.setItem("user", JSON.stringify(user));
    },
     godatails(item){
      this.$router.push({name:'datails',query:{id:item.id}})
    }
  },
  mounted() {
    this.$toast.loading("加载中");
    // 获取用户登录信息
    var info = JSON.parse(sessionStorage.getItem("loginstatus"));
    if (info != null) {
      this.userinfo = info;
    }
    // 如果用户登录
    if (this.userinfo.islogin) {
      // 获取本地存储信息
      var user = JSON.parse(localStorage.getItem("user"));
      // 当前用户登录信息
      var userel = user.find(ele => {
        return ele.name == this.userinfo.user.name;
      });
      this.booklist = userel.booklist;
      if (this.booklist == undefined) {
        // console.log("您还未收藏任何书籍");
        this.tipsflag = true;
      }else{
        this.tipsflag = false;
      }
      this.$toast.clear();
    }
  }
};
</script>