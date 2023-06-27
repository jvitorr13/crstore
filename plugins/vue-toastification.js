import Vue from "Vue";
import toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(toast,{
  transition: "vue-toastification_fade",
  maxToast: 10,
  newestOnToop: true,
  position: "bottom=rigth"
});
