const privateRoutes = [];

const adminRoutes = [
  {
    path: "/admin",
    exact: true,
    loader: () => import("../pages/Admin/index"),
    menu: true,
    label: "Admin",
    permissionRequired: null,
    icon: "admin",
  },
];

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
  {
    path: "/contact",
    exact: true,
    loader: () => import("../pages/Contact/index"),
    menu: true,
    label: "Contact",
    permissionRequired: null,
    icon: "contact",
  },
  {
    path: "/shop",
    exact: true,
    loader: () => import("../pages/Shop/Shop"),
    menu: true,
    label: "Shop",
    permissionRequired: null,
    icon: "shop",
  },
  {
    path: "/shop/:search",
    exact: false,
    loader: () => import("../pages/Shop/Shop"),
    menu: true,
    label: "Shop",
    permissionRequired: null,
    icon: "shop",
  },
  {
    path: "/phone",
    exact: true,
    loader: () => import("../pages/Shop/Shop"),
    menu: true,
    label: "Phone",
    permissionRequired: null,
    icon: "phone",
  },
  {
    path: "/phone/:cate",
    exact: false,
    loader: () => import("../pages/Shop/Shop"),
    menu: true,
    label: "Phone",
    permissionRequired: null,
    icon: "phone",
  },
  {
    path: "/laptop",
    exact: true,
    loader: () => import("../pages/Shop/Shop"),
    menu: true,
    label: "Laptop",
    permissionRequired: null,
    icon: "laptop",
  },
  {
    path: "/laptop/:laptop",
    exact: false,
    loader: () => import("../pages/Shop/Shop"),
    menu: true,
    label: "Laptop",
    permissionRequired: null,
    icon: "laptop",
  },
  {
    path: "/checkout",
    exact: true,
    loader: () => import("../pages/Checkout/index"),
    menu: true,
    label: "Shop women",
    permissionRequired: null,
    icon: "women",
  },
];

export default {
  privateRoutes,
  authRoutes,
  errorRoutes,
  publicRoutes,
  adminRoutes
};
