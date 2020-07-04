export const routerComponent = {
    // home
    homecomponent() {
        return import ("../views/Home.vue")
    },
    // 分类
    classifycomponent() {
        return import ("../views/Classify.vue")
    },
    // 排行
    rankcomponent() {
        return import ("../views/Ranking.vue")
    },
    // 男女频
    channelcomponent() {
        return import ("../views/Channel.vue")
    },
    // 书单
    bookscomponent() {
        return import ("../views/Books.vue")
    },
    // 书籍详情
    datailscomponent() {
        return import ("../views/Datails.vue")
    },
    // 目录
    catalogcomponent() {
        return import ("../views/Catalog.vue")
    },
    // 阅读
    pagecomponent() {
        return import ("../views/Page.vue")
    },
    // 搜索
    searchcomponent() {
        return import ("../views/Search.vue")
    },
    // 注册
    registerComponent() {
        return import ('../views/Register.vue')
    },
    // 登录
    loginComponent() {
        return import ('../views/Login.vue')
    },
    // 引导页
    guideComponent() {
        return import ('../views/Guide.vue')
    },
    // 广告
    ggComponent() {
        return import ('../views/Gg.vue')
    },
    // 书架
    bookrackComponent() {
        return import ('../views/Bookrack.vue')
    },
    // 我的
    MeComponent() {
        return import ('../views/Me.vue')
    },
    // 观看历史
    ViewhistoryComponent() {
        return import ('../views/Viewhistory.vue')
    },
    // 书单推荐类型
    TypelistComponent() {
        return import ('../views/Typelist.vue')
    }
}