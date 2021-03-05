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
];

export default {
  privateRoutes,
  authRoutes,
  errorRoutes,
  publicRoutes,
};
