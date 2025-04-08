export const routes = {
  home: "/",
  auth: {
    register: "/registreren",
    login: "/inloggen",
    forgotPassword: "/wachtwoord-vergeten",
  },
  cars: {
    all: "/autos",
    single: (id: string) => `/autos/${id}`,
  },
  dashboard: {
    home: "/dashboard",
    createAd: "/dashboard/plaats-advertentie",
    settings: "/dashboard/instellingen",
  },
};

export const publicRoutes = [routes.home, routes.cars];
export const protectedRoutes = [routes.dashboard.home];
export const authRoutes = [routes.auth.register, routes.auth.login];
export const apiAuthPrefix = "/api";
