import Fetch from './fetch.js';

let service = {
    // getkind(id,page){
    //     return Fetch('/api/v1.0/book/?kind=' + id + '&page=' + page,{
    //         method: 'GET'
    //     })
    // },
    // addbook(data){
    //     return Fetch("/api/v1.0/book/",{
    //         method: "POST",
    //         data: data
    //     })
    // },
    // borrowbook(data,token){
    //     console.log("token",token)
    //     console.log(data)
    //     var self = this;
    //     return Fetch("/api/v1.0/booklend/",{
    //         method: "POST",
    //         data: data,
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'token': self.token
    //         }
    //     })
    // }

    
    getMyBook(data,token){
        var self = this;
        return Fetch("/api/v1.0/mybooks/",{
            method: "POST",
            data: data
        },token)
    },

    returnBook(data,token){
        var self = this;
        return Fetch("/api/v1.0/return/",{
            method: "POST",
            data: data
        },token)
    },

    renewBook(data,token){
        var self = this;
        return Fetch("/api/v1.0/renew/",{
            method: "POST",
            data: data
        },token)
    }
}

  export default service;