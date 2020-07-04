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
    psd2: {
        // 密码框内容
        item: "",
        // 验证密码框是否正确
        psdBool: false,
        // 密码框的类型
        type: "password",
        // 密码框的提示信息
        message: "",
        // 右侧图标
        icon: "closed-eye",
        // 密码是否一致
        flag: false
    },
    // 注册框是否禁用
    checkBool: true,

    // 遮罩层
    show: false,
    // 判断密码是否一致
    flag: true
};