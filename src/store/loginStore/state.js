export const state = {
    user: {
        // 用户框内容
        name: "",
        // 提示信息
        message: "",
        // 验证用户名是否正确
        nameBool: "false"
    },
    psd1: {
        // 密码框内容
        item: "",
        // 验证密码框是否正确
        psdBool: false,
        // 密码框的类型
        type: "password",
        // 密码框的提示信息
        message: "",
        // 右侧图标
        icon: "closed-eye"
    },

    // 注册框是否禁用
    checkBool: true,

    // 遮罩层
    show: false,

    // 成功跳转标记
    homebool: false
};