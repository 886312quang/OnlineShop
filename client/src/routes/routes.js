const privateRoutes = [];

const authRoutes = [];

const errorRoutes = [];

const publicRoutes = [
  {
    path: "/",
    exact: true,
    loader: () => import("../pages/Home/Home"),
    menu: true,
    label: "Trang chủ",
    permissionRequired: null,
    icon: "home",
  },
  {
    path: "/products/:id",
    loader: () => import("../pages/Products/index"),
    menu: true,
    label: "Product",
    permissionRequired: null,
    icon: "product",
  },
  {
    path: "/news",
    exact: true,
    loader: () => import("../pages/News/index"),
    menu: true,
    label: "news",
    permissionRequired: null,
    icon: "new",
  },
  {
    path: "/news/:id",
    exact: false,
    loader: () => import("../pages/News/NewsDetail"),
    menu: true,
    label: "News detail",
    permissionRequired: null,
    icon: "detail",
  },
  {
    path: "/news/category/:cate",
    exact: false,
    loader: () => import("../pages/News/NewsCate"),
    menu: true,
    label: "News category",
    permissionRequired: null,
    icon: "category",
  },
];

export default {
  privateRoutes,
  authRoutes,
  errorRoutes,
  publicRoutes,
};
