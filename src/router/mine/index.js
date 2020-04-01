const routes = [
    {
        path: "/mine",
        name: "mine",
        component: () => import('@/components/mine'),
        meta: "我的"
    }
];

export default routes;