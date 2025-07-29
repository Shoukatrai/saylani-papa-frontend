import { Bounce, toast } from "react-toastify";
export const BASE_URL = "http://localhost:5000/api"


export const toastAlert = (obj) => {
    console.log("obj" , obj)
  if (obj.type === "error") {
    toast.error(obj.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } else {
    toast.success(obj.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
};

