import { Bounce, toast } from "react-toastify";
export const BASE_URL = "http://ec2-16-16-204-153.eu-north-1.compute.amazonaws.com:80/api"


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

