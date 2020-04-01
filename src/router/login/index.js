
const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import('@/components/login'),
        meta: {
          title: '登录'
        }
    }
];

export default routes;
    
