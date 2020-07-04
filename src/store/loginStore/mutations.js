export const mutations = {
    // 用户名输入时提示显示
    verifyName(state, user) {
        if (user.nameBool) {
            user.message = "";
        } else {
            user.message = "请输入由中文、英文大小写、下划线组成3-8位用户名";
        }
    },

    // 用户名验证成败提示信息
    checkName(state) {
        state.user.message = state.user.nameBool ? "" : "用户名格式错误！";
        if (state.user.item == "") {
            state.user.message = ""
        }
        // 判断用户名是否存在
        var userinfo = JSON.parse(localStorage.getItem("user"));
        if (userinfo == null) {
            state.user.message = "用户名不存在!请注册！";
            state.user.nameBool = false;
        } else {
            var judge = userinfo.some(item => item.name == state.user.name);
            if (!judge) {
                state.user.message = "用户名不存在!请注册";
                state.user.nameBool = false;
            }
        }
    },

    // 密码框输入时提示信息
    varifyPass(state, ele) {
        if (ele.psdBool) {
            ele.message = "";
        } else {
            ele.message = "请输入以字母开头，长度在6~14之间，只能包含字母、数字和下划线的密码";
        }
    },

    // 验证密码
    checkPassworld(state, ele) {
        if (ele.item == "") {
            ele.message = "";
        } else {
            ele.message = ele.psdBool ? "" : "密码格式错误！";
        }
    },

    // 切换密码框类型
    changType(state, ele) {
        // ele.psdBool = !ele.psdBool
        ele.type = ele.type == "password" ? "text" : "password";
        ele.icon = ele.icon == "closed-eye" ? "eye-o" : "closed-eye";
    },
    // 登录按钮选择
    loginCheck(state) {
        if (state.user.nameBool == true && state.psd1.psdBool == true) {
            state.checkBool = false;
        } else {
            state.checkBool = true;
        }
    },

    // 遮罩层显示  数据本地存储
    showOL(state) {
        var userinfo = JSON.parse(localStorage.getItem("user"));
        var judge = userinfo.some(element => element.name == state.user.name && element.password == state.psd1.item);

        if (judge) {
            state.show = true;
            setTimeout(function() {
                state.show = false;
                state.homebool = true;
            }, 2000);
        } else {
            alert("请输入正确密码！");
        }
    }
};