import axios from 'axios';

console.log('good worker');
onmessage = function (e) {
    console.group();
    console.log(e.data);
    
    let len = 10;
    const API = 'http://localhost:3000';
    let times = 0;
    while (len) {
        let idx = len--;
        axios(API + `?_get_${idx}`, { method: 'GET' })
        .then(() => {
            axios(API + `?_post_${idx}`, { method: 'POST' })
            .then(() => {
                postMessage(++times);
            })
        })
    }

    console.groupEnd();
}