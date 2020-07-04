export const mutations = {
    // 用户名输入时提示显示
    verifyName(state, user) {
        if (user.nameBool) {
            user.message = "";
        } else {
            user.message = "请输入由中文、英文大小写、下划线组成3-8位用户名";
        }
        // 判断用户名是否存在
        var userinfo = JSON.parse(localStorage.getItem("user"));
        if (userinfo != null) {
            var judge = userinfo.some(item => item.name == state.user.name);
            if (judge) {
                (state.user.message = "用户名已存在"), (state.user.nameBool = false);
            }
        }
    },

    // 用户名验证成败提示信息
    checkName(state) {
        state.user.message = state.user.nameBool ? "" : "用户名格式错误！";
        if (state.user.name == "") {
            state.user.message = ""
        }
    },

    // 密码框输入时提示信息
    varifyPass(state, ele) {
        if (ele.psdBool) {
            ele.message = "";
        } else {
            ele.message = "请输入以字母开头，长度在6~14之间，只能包含字母、数字和下划线的密码";
        }

        if (ele == state.psd2) {
            if (state.psd1.item == "") {
                state.psd2.message = "请按顺序输入信息";
                state.psd2.item = "";
            } else {
                if (state.psd1.item.length < state.psd2.item.length) {
                    state.psd2.message = "两次输入密码不一致!";
                }
                if (state.psd1.item.length == state.psd2.item.length) {
                    if (state.psd1.item != state.psd2.item) {
                        state.psd2.message = "两次输入密码不一致!";
                    } else {
                        state.psd2.flag = true;
                    }
                } else {
                    state.psd2.message = "请输入以字母开头，长度在6~14之间，只能包含字母、数字和下划线的密码";
                }
            }
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
    // 注册按钮选择
    registerCheck(state) {
        if (state.user.nameBool == true && state.psd2.flag == true) {
            state.checkBool = false;
        } else {
            state.checkBool = true;
        }
    },

    // 遮罩层显示  数据本地存储
    showOL(state) {
        state.show = true;
        var userinfo = JSON.parse(localStorage.getItem("user"));
        if (userinfo == undefined) {
            userinfo = [];
            userinfo.push({
                name: state.user.name,
                password: state.psd1.item
            });
            localStorage.setItem("user", JSON.stringify(userinfo));
        } else {
            userinfo.push({
                name: state.user.name,
                password: state.psd1.item
            });
            localStorage.setItem("user", JSON.stringify(userinfo));
        }
        setTimeout(function() {
            state.show = false;
            state.user.name = state.psd1.item = state.psd2.item = "";

        }, 3000);
    }
};