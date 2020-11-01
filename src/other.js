import axios from 'axios';

const API = 'http://localhost:3000';
let times = 0;

console.log('good worker');
onmessage = function (e) {
    let total = e.data;

    const baseNo = 30;
    const queue = new Array(Math.floor(total / baseNo)).fill(baseNo);
    total % baseNo !== 0 && queue.push(total % baseNo);
    console.log(total, baseNo, queue);

    todo(queue);
}

function fire (queue) {
    console.log(queue);
    let len = queue.pop();
    while (len) {
        let idx = len--;
        axios(API + `?_get_${idx}`, { method: 'GET' })
        .then(() => {
            axios(API + `?_post_${idx}`, { method: 'POST' })
            .then(() => {
                postMessage(++times);
                if (idx === 1) todo(queue);
            })
        })
    }
}

function todo (queue) {
    setTimeout(() => {
        fire(queue);
    }, 200 * 0)
}