<template>
  <div class="my-page">
    <div class="mynav">
      <div class="lefticon fl" @click="goback">
        <span class="iconfont icon-zuojiantouxiangzuoxianxing"></span>
      </div>
      <div class="righticon fr" @click="gohome">
        <span class="iconfont icon-shouye2"></span>
      </div>
      <div class="middle">我的</div>
    </div>
    <div class="ChatHead">
      <img src="../assets/images/nabtouxiang.png" class="auto-img" alt />
    </div>
    <div class="my-contant">
      <div class="mycollect" @click="gobookrack">我的收藏</div>
      <div class="border"></div>
      <div class="myviews" @click="goviews">我的浏览记录</div>
    </div>
    <div class="login">
      <van-button v-show="!btflag" color="linear-gradient(to right, #4bb0ff, #00c98d)" to="/login">登录</van-button>
      <van-button v-show="btflag" color="linear-gradient(to right, #4bb0ff, #00c98d)" @click="loginout">退出登录</van-button>
    </div>
  </div>
</template>

<style lang="less">
.my-page {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("../assets/images/mybg.jpg") no-repeat center center;
  background-size: cover;

  .mynav {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 44px;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.8);
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

  .ChatHead {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 100px auto 50px auto;
    > img {
      height: 100%;
    }
  }
  .my-contant {
    margin: 20px 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 16px;
  }
  .border {
    background-color: #e8e8e8;
    height: 1px;
    margin: 16px 0px;
  }
  .mycollect,
  .myviews {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    position: relative;
    &::after {
      position: absolute;
      right: 20px;
      top: 15px;
      content: "";
      width: 10px;
      height: 10px;
      border-right: 2px solid #00c98d;
      border-top: 2px solid #00c98d;
      transform: rotate(45deg);
    }
  }

  .login {
    padding: 20px;
    text-align: center;
    .van-button {
      width: 40%;
      font-size: 16px;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      // 登录用户信息
      userinfo: {
        islogin: false,
        user: ""
      },
      //登录注销按钮
      btflag: false
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    gohome() {
      this.$router.push({ name: "home" });
    },
    gobookrack() {
      if (this.btflag) {
        this.$router.push({ name: "bookrack" });
      } else this.$toast("请登录查看");
    },
    goviews() {
      if (this.btflag) {
        this.$router.push({ name: "views" });
      } else this.$toast("请登录查看");
    },
    
    loginout(){
        // sessionStorage.clear()
        sessionStorage.removeItem('loginstatus');
        // 刷新页面,刷新session
        this.$router.go(0);
        this.btflag = false;
    }
  },
  mounted() {
    // 获取用户登录信息
    var info = JSON.parse(sessionStorage.getItem("loginstatus"));
    if (info != null) {
      this.userinfo = info;
    }
    // 如果用户登录
    if (this.userinfo.islogin) {
      this.btflag = true;
      // 所有本地存储用户信息
      var user = JSON.parse(localStorage.getItem("user"));
      // 当前用户登录信息
      var userel = user.find(ele => {
        return ele.name == this.userinfo.user.name;
      });
    }
  }
};
</script>