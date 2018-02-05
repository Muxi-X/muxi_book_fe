import Fetch from './fetch.js';
import Cookie from './cookie.js';
let service = {

    // getMyBook(data,token){
    //     console.log("token",token)
    //     console.log(data)
    //     var self = this;
    //     return Fetch("/api/v1.0/mybooks/",{
    //         method: "POST",
    //         data: data
    //     },token)
    // },

    // returnBook(data,token){
    //     console.log("token",token)
    //     console.log(data)
    //     var self = this;
    //     return Fetch("/api/v1.0/return/",{
    //         method: "POST",
    //         data: data
    //     },token)
    // },

    // renewBook(data,token){
    //     console.log("token",token)
    //     console.log(data)
    //     var self = this;
    //     console.log("renew");
    //     return Fetch("/api/v1.0/renew/",{
    //         method: "POST",
    //         data: data
    //     },token)
    // }
    login(data){
        console.log(data)
        return Fetch("/api/v1.0/login/",{
            method: "POST",
            data: data
        })
    },
    toLoginPage() {
        Cookie.setCookie('url', window.location.href)
        window.location = "http://pass.muxixyz.com?landing="+ window.location.href.split('/')[2] +"/landing"
        //window.location = "http://pass.muxixyz.com?landing=39.108.79.110:3000/landing"
        //window.location = "http://pass.muxixyz.com?landing=localhost:3000/landing"
    }
}

  export default service;