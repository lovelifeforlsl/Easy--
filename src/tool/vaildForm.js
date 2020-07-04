class ValidForm {

    constructor() {
        //匹配由中文大小写下划线组成3-8位
        this.usernameReg = /^[\u4E00-\u9FA5A-Za-z0-9_]{3,8}$/;

        //以字母开头，长度在6~14之间，只能包含字母、数字和下划线
        this.passReg = /^[a-zA-Z]\w{5,13}$/;
    }

    //验证用户名
    validUsername(value) {
        return this.usernameReg.test(value);
    }
    validPass(value) {
        return this.passReg.test(value);
    }

}

export const validForm = new ValidForm();