import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from "./routes";

// 创建router实例
const router = new VueRouter({routes});

new Vue({
   el:"#app",
    data:{
      css:{
         value:'coy'
      }
    },
   mounted:function () {
       if(localStorage.getItem("v_color")){
           this.css.value = localStorage.getItem("v_color");
       }

   },
   router
});