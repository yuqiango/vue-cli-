import Router from 'vue-router';
import store from '@/store';

let routes = [];
const routerContext = require.context('./', true, /index\.js$/);

routerContext.keys().forEach(route => {
    // 如果是根目录的 index.js、 不做任何处理         
    if (route.startsWith('./index')) {
        return
    }                   
    const routerModule = routerContext(route)           
    // 兼容 import export 和 require module.export 两种规范  Es modules  commonjs
    routes = [...routes, ...(routerModule.default || routerModule)]     
 })

const router = new Router({
         mode: "history",
         routes
});



router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if(to.path === "/login") {
        next();
    }else if(store.state.token) {
        next();
    }else {
        // alert("1111");
        next({
          path: '/login'
        })
    }
});

export default router;