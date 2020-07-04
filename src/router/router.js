import { routerComponent } from "./routerComponent"
export const routes = [{
        path: "/home",
        name: "home",
        component: routerComponent.homecomponent
    },
    {
        path: "/classify",
        name: "classify",
        component: routerComponent.classifycomponent
    },
    {
        path: "/rank",
        name: "rank",
        component: routerComponent.rankcomponent
    },
    {
        path: "/channel",
        name: "channel",
        component: routerComponent.channelcomponent
    },
    {
        path: "/books",
        name: "books",
        component: routerComponent.bookscomponent
    },
    {
        path: "/datails",
        name: "datails",
        component: routerComponent.datailscomponent
    },
    {
        path: "/catalog",
        name: "catalog",
        component: routerComponent.catalogcomponent
    },
    {
        path: "/page",
        name: "page",
        component: routerComponent.pagecomponent
    },
    {
        path: "/search",
        name: "search",
        component: routerComponent.searchcomponent
    },
    {
        path: "/register",
        name: "register",
        component: routerComponent.registerComponent
    },
    {
        path: "/login",
        name: "login",
        component: routerComponent.loginComponent
    },
    {
        path: "/gg",
        name: "gg",
        component: routerComponent.ggComponent
    },
    {
        path: "/bookrack",
        name: "bookrack",
        component: routerComponent.bookrackComponent
    },
    {
        path: "/me",
        name: "me",
        component: routerComponent.MeComponent
    },
    {
        path: "/views",
        name: "views",
        component: routerComponent.ViewhistoryComponent
    },
    {
        path: "/type",
        name: "type",
        component: routerComponent.TypelistComponent
    },
    {
        path: "/",
        name: "guide",
        component: routerComponent.guideComponent
    },
    {
        path: "*",
        redirect: { name: "home" }
    }
]