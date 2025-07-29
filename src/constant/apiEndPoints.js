// auth endpoints
const apiEndPoints = {
  signup: "/auth/signup",
  login: "/auth/login",
  verifyEmail: "/auth/verify-email",
  uploadImage: "/imagels/upload",

  //vendor
  createRestaurant: "/restaurant/create-restaurant",
  editRestaurant: "/restaurant/create-restaurant",
  selectRestaurant: "/restaurant/select-restaurant",
  createMenu: "/restaurant/create-menu",
  editMenu: (id) => `/menu/menu-edit/${id}`,
  deleteMenu: (id) => `/menu/menu-delete/${id}`,
  fetchMenu: "/restaurant/menu-listing",
  fecthAllOrders : "/order/vendor-order",
  //client
  userGetRes: "/client/all-top-restaurants",
  userOrderRes: "/client/all-restaurants",
  userGetMenu: "/client/all-menu",
  makeOrder: "/client/make-order",
  getOrderByStatus: (status)=>`/client/make-order?status =${status}`,
  vendorOrderStatus: (id) => `/order/vendor-order/${id}`,


  // admin
  adminAllRestaurant: "/admin/all-restaurants",
  restaurantApproval: (id) => `/admin/restaurant-approve/${id}`,
  restaurantAdminDelete: (id) => `/admin/restaurant-delete/${id}`,
  allVendorsGet: "/admin/all-vendors",
  allusersGet: "/admin/all-users",

};

export default apiEndPoints;
