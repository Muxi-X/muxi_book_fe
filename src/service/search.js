import Fetch from './fetch.js';

let service = {
    searchbook(data,page){
        return Fetch('./api/v1.0/search/?' + '&page=' + page,{
            method: "POST",
            data:data
        })
    }
}

  export default service;