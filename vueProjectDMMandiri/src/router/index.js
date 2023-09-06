import Vue from "vue";
import Router from "vue-router";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

const Signin = () => import("@/views/pages/Signin");

// Users
const Users = () => import("@/views/users/Users");
const User = () => import("@/views/users/User");

//User Data
const UsersData = () => import("@/views/userdata/Users");
const Pengguna = () => import("@/views/pengguna/Pengguna");
const Cabang = () => import("@/views/cabang/Cabang");
const Layar = () => import("@/views/layar/Layar");
const Peran = () => import("@/views/peran/Peran");
const PeranLayar = () => import("@/views/peranLayar/PeranLayar");
const PenggunaAkun = () => import("@/views/users/Forms");

Vue.use(Router);

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});

function configRoutes() {
  let OpsiLayar = "";

  let urldir = "/pages/signin";

  OpsiLayar = localStorage.getItem("Layar") ?? "";

  console.log(localStorage.getItem("Layar"));

  let akun = { path: "/akun/list", redirect: { name: "Home" } };

  let pengguna = { path: "/pengguna/list", redirect: { name: "Home" } };

  let cabang = { path: "/cabang/list", redirect: { name: "Home" } };

  let layar = { path: "/layar/list", redirect: { name: "Home" } };

  let peran = { path: "/peran/list", redirect: { name: "Home" } };

  let peranLayar = { path: "/peranLayar/list", redirect: { name: "Home" } };

  let penggunaAkun = { path: "/penggunaAkun/list", redirect: { name: "Home" } };

  if (OpsiLayar !== "") {
    urldir = "/userdata/list";
    console.log(17766, OpsiLayar);
    OpsiLayar = JSON.parse(localStorage.getItem("Layar"));

    if (OpsiLayar.filter((e) => e.namaLayar === "Menu Akun").length > 0) {
      akun = {
        path: "userdata",
        redirect: "userdata",
        name: "List Akun",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "list",
            component: {
              render(c) {
                return c("router-view");
              }
            },
            children: [
              {
                path: "",
                component: UsersData
              }
            ]
          }
        ]
      };
    }

    if (OpsiLayar.filter((e) => e.namaLayar === "Menu Pengguna").length > 0) {
      pengguna = {
        path: "pengguna",
        redirect: "pengguna",
        name: "List Pengguna",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "list",
            component: {
              render(c) {
                return c("router-view");
              }
            },
            children: [
              {
                path: "",
                component: Pengguna
              }
            ]
          }
        ]
      };
    }

    if (OpsiLayar.filter((e) => e.namaLayar === "Menu Cabang").length > 0) {
      cabang = {
        path: "cabang",
        redirect: "cabang",
        name: "List Cabang",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "list",
            component: {
              render(c) {
                return c("router-view");
              }
            },
            children: [
              {
                path: "",
                component: Cabang
              }
            ]
          }
        ]
      };
    }

    if (OpsiLayar.filter((e) => e.namaLayar === "Menu Layar").length > 0) {
      layar = {
        path: "layar",
        redirect: "layar",
        name: "List Layar",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "list",
            component: {
              render(c) {
                return c("router-view");
              }
            },
            children: [
              {
                path: "",
                component: Layar
              }
            ]
          }
        ]
      };
    }

    if (OpsiLayar.filter((e) => e.namaLayar === "Menu Peran").length > 0) {
      peran = {
        path: "peran",
        redirect: "peran",
        name: "List Peran",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "list",
            component: {
              render(c) {
                return c("router-view");
              }
            },
            children: [
              {
                path: "",
                component: Peran
              }
            ]
          }
        ]
      };
    }

    if (
      OpsiLayar.filter((e) => e.namaLayar === "Menu Peran Layar").length > 0
    ) {
      peranLayar = {
        path: "peranLayar",
        redirect: "peranLayar",
        name: "Peran & Layar",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "list",
            component: {
              render(c) {
                return c("router-view");
              }
            },
            children: [
              {
                path: "",
                component: PeranLayar
              }
            ]
          }
        ]
      };
    }
    if (
      OpsiLayar.filter((e) => e.namaLayar === "Menu Pengguna Akun").length > 0
    ) {
      penggunaAkun = {
        path: "penggunaAkun",
        redirect: "penggunaAkun",
        name: "Daftar Pengguna & Akun",
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "daftar",
            component: {
              render(c) {
                return c("router-view");
              }
            },
            children: [
              {
                path: "",
                component: PenggunaAkun
              }
            ]
          }
        ]
      };
    }
  }

  return [
    {
      path: "/",
      redirect: urldir,
      name: "Home",
      label: "User Management",
      component: TheContainer,
      children: [akun, pengguna, cabang, layar, peran, peranLayar, penggunaAkun]
    },
    {
      path: "/pages",
      redirect: "/pages/signin",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        {
          path: "Signin",
          name: "Signin",
          component: Signin
        }
      ]
    }
  ];
}
