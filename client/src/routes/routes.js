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
];

export default {
  privateRoutes,
  authRoutes,
  errorRoutes,
  publicRoutes,
};
