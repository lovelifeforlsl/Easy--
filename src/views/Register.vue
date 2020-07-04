<template>
  <div class="register" ref="register">
    <div class="head-bg">
      <img src="../assets/images/headbg.jpg" class="auto-img" alt />
      <div class="portrait"></div>
    </div>
    <div class="register-info animated bounceInUp">
      <van-cell-group>
        <van-field
          left-icon="contact"
          v-model="user.name"
          label="用户名"
          placeholder="请输入用户名"
          :error-message="user.message"
          @input="verifyUserName"
          @blur="checkName"
        />

        <van-field
          v-model="psd1.item"
          label="密码"
          left-icon="lock"
          :type="psd1.type"
          :right-icon="psd1.icon"
          placeholder="请输入密码"
          :error-message="psd1.message"
          @click-right-icon="changType(psd1)"
          @input="verifyPassworld(psd1)"
          @blur="checkPassworld(psd1)"
        />

        <van-field
          v-model="psd2.item"
          label="验证密码"
          left-icon="lock"
          :type="psd2.type"
          :right-icon="psd2.icon"
          placeholder="请输入密码"
          :error-message="psd2.message"
          @click-right-icon="changType(psd2)"
          @blur="checkPassworld(psd2)"
          @input="verifyPassworld(psd2)"
        />
      </van-cell-group>
      <div class="register-form">
        <van-button
          class="register-btn"
          :disabled="checkBool"
          type="info"
          block
          text="注册"
          @click="showOL"
        />
      </div>
      <div class="login">
        <router-link to="/login">
          <span class="lolo">已有账号？登录</span>
        </router-link>
      </div>
    </div>
    <div class="Overlay" ref="overlay" v-show="show">
      <div class="registering">
        <div class="registerLoading">
          <van-loading size="36px" text-size="16px" vertical>注册中...</van-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less" >
.register {
  width: 100%;
  height: 100%;
  // background-color: #d9d9d9;
  background: linear-gradient(45deg, #bfbfbf, #808080, #595959, #000);
  .head-bg {
    position: relative;
    .portrait {
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: -50px;
      margin: auto;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: url("../assets/images/register-icon.jpg");
      background-size: 100% 100%;
      z-index: 1000;
    }
  }
  .register-info {
    padding: 120px 20px 0px 20px;
    .van-cell-group {
      border-radius: 20px;
      overflow: hidden;
    }
    .register-form {
      padding: 10px;
    }
    .register-btn {
      margin-top: 50px;
    }
    .login {
      margin-top: 20px;
      text-align: center;
      .lolo {
        color: white;
        font-size: 14px;
      }
    }
  }
}
.Overlay {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  z-index: 99999;
  .registering {
    width: 100%;
    height: 100%;
    position: relative;
    .registerLoading {
      width: 100%;
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

<script>
import { validForm } from "../tool/vaildForm";

import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("registerModule");

export default {
  computed: {
    ...mapState(["user", "psd1", "psd2", "checkBool", "show"])
  },
  methods: {
    ...mapMutations([
      "checkName",
      "changType",
      "checkPassworld",
      "verifyName",
      "varifyPass",
      "registerCheck"
    ]),

    // 验证用户名格式是否正确
    verifyUserName() {
      if (this.user.name != "") {
        // 判定用户名格式是否正确
        this.user.nameBool = validForm.validUsername(this.user.name);
        // 控制用户名提示信息
        this.verifyName(this.user);
      } else {
        this.user.message = "";
      }
      this.registerCheck();
    },
    // 验证密码 格式是否正确
    verifyPassworld(ele) {
      if (ele.item != "") {
        // 判定密码格式是否正确
        ele.psdBool = validForm.validPass(ele.item);
        // 控制密码提示信息
        this.varifyPass(ele);
      } else {
        ele.message = "";
      }
      this.registerCheck();
    },
    showOL() {
      this.$store.commit("registerModule/showOL");
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    let registerH =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.$refs.register.style.height = registerH + "px";
    this.$refs.overlay.style.height = registerH + "px";
    this.user.name = this.psd1.item1 = this.psd2.item = "";
  },
  beforeRouteLeave(to, from, next) {
    this.user.name = this.psd1.item = this.psd2.item = "";
    this.user.message = this.psd1.message = this.psd2.message = "";
    next();
  }
};
</script>