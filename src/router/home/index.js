
const routes = [
    {
        path: "/",
        name: "home",
        component: () => import('@/components/home'),
        meta: {
          title: '首页'
        }
    }
];

export default routes;
    
